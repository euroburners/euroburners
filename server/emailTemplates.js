Accounts.emailTemplates.siteName = "Euroburners";
Accounts.emailTemplates.from = "Euroburners.org <info@euroburners.org>";

Accounts.emailTemplates.verifyEmail = {
  subject: function (user) {
    return "Welcome to Euroburners.org";
  },
  text: function (user, url) {
   return "Welcome to Euroburners.org!\n\n"
     + "Please follow the link below to verify your email address:\n\n"
     + url;
  }
};
