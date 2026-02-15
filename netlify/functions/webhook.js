exports.handler = async (event) => {

  const VERIFY_TOKEN = "fmtransWebhook2026";

  if (event.httpMethod === "GET") {

    const mode = event.queryStringParameters["hub.mode"];
    const token = event.queryStringParameters["hub.verify_token"];
    const challenge = event.queryStringParameters["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return {
        statusCode: 200,
        body: challenge
      };
    }

    return {
      statusCode: 403,
      body: "Verification failed"
    };
  }

  if (event.httpMethod === "POST") {
    console.log("Webhook event:", event.body);

    return {
      statusCode: 200,
      body: "EVENT_RECEIVED"
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed"
  };
};
