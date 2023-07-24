import { z } from "https://deno.land/x/zod/mod.ts";

const ChatFunctionPayloadSchema = z.object({
  messages: z.array(
    z.object({
      text: z.string(),
      source: z.enum(["USER", "BOT"]),
      timestamp: z.string(),
    })
  ),
  notes: z
    .object({
      currentGoal: z.string().optional(),
      currentStepIndices: z.array(z.number()).optional(),
      searchQuery: z.string().optional(),
      queryResult: z.any(),
      collectedData: z.record(z.string()).optional(),
      goalFirstMsgIndex: z.number().optional(),
    })
    .optional(),
});

export type ChatFunctionPayload = z.infer<typeof ChatFunctionPayloadSchema>;

export type ChatFunctionReturn = Partial<ChatFunctionPayload["notes"]>;

export type ChatFunction = (
  payload: ChatFunctionPayload
) => Promise<ChatFunctionReturn>;

const leadDataSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  company: z.string(),
});

export type LeadData = z.infer<typeof leadDataSchema>;

const CLIENT_ID = "{{salesforceClientId}}";
const CLIENT_SECRET = "{{salesforceClientSecret}}";
const INSTANCE_URL = "{{salesforceInstanceUrl}}";
const API_VERSION = "{{salesforceApiVersion}}";

export async function submitSalesforceLead({
  clientId,
  clientSecret,
  leadData,
}: {
  clientId: string;
  clientSecret: string;
  leadData: LeadData;
}) {
  // First get the token
  const tokenEndpoint = `${INSTANCE_URL}/services/oauth2/token`;
  console.log(leadData);
  const formData = new FormData();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(tokenEndpoint, requestOptions);
  const { access_token } = await response.json();
  // Throw an error if we didn't get a token
  if (!access_token) {
    throw new Error("No access token received from Salesforce");
  }
  // Throw an error if the response is not ok
  if (!response.ok) {
    throw new Error("Salesforce token request failed");
  }
  const leadEndpoint = `${INSTANCE_URL}/services/data/${API_VERSION}/sobjects/Lead`;
  const leadResponse = await fetch(leadEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      LastName: leadData.name,
      Company: leadData.company,
      Email: leadData.email,
    }),
  });
  return leadResponse;
}

export const salesforceHandler: ChatFunction = async ({ notes }) => {
  // parse data gathered by the chatbot
  const parsedLeadData = leadDataSchema.safeParse(notes?.collectedData);

  if (!parsedLeadData.success) {
    throw new Error("Lead data was not valid");
  }

  const leadData = parsedLeadData.data;

  const response = await submitSalesforceLead({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    leadData,
  });

  const responseContent = await response.json();

  // check for error due to duplicate record existing in Salesforce
  if (!response.ok) {
    const errorCode = responseContent[0].errorCode;
    if (errorCode === "DUPLICATES_DETECTED") {
      console.log("Duplicate detected");
      return {
        queryResult: "Duplicate was detected",
      };
    } else {
      throw new Error("Salesforce lead submission failed");
    }
  }

  return {};
};
