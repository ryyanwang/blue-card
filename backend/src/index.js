const express = require("express");
const app = express();

// Set up SendInBlue
const Sib = require("sib-api-v3-sdk");
const SibClient = Sib.ApiClient.instance;
const apiKey = SibClient.authentications["api-key"];
apiKey.apiKey = process.env.SibKey;
const tranEmailApi = new Sib.TransactionalEmailsApi();
const { GenerateEmail } = require("./util.js");

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://blue-card-development.web.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.post("/email", (req, res) => {
  const { email, firstName } = req.body;
  sendEmail(email, firstName);
  res.send();
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App listening at port ${port}`);

// Helpers
const sendEmail = (email, firstName) => {
  tranEmailApi
    .sendTransacEmail({
      sender: {
        email: "bluecard-automated@outlook.com",
        name: "BlueCard",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "Welcome to Blue Card!",
      htmlContent: GenerateEmail({
        email: email,
        firstName: firstName,
      }),
    })
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};
