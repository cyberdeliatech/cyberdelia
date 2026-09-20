# Cyberdelia Client Website Setup Guide

## You Own Your Website

At Cyberdelia, we believe your website should belong to **you**.

We don't believe you should be locked into our software, our hosting, or a proprietary platform just to keep your website online. When we build your website, you maintain ownership of your domain, code, accounts, and online services.

To get started, we may ask you to create a few free accounts and give Cyberdelia access to the appropriate services.

Don't worry — we'll guide you through each step.

---

# 1. Create a GitHub Account

GitHub is where your website's code can be stored safely and securely.

Think of GitHub as the **digital home for your website's files and code**.

### Step 1 — Go to GitHub

Visit:

https://github.com/

Click **Sign up**.

### Step 2 — Create Your Account

Use an email address that you control and will continue to have access to.

Complete the GitHub signup process and verify your email address.

### Step 3 — Create a Repository

Once you're logged in:

1. Click the **+** button in the upper-right corner.
2. Select **New repository**.
3. Give the repository a name.

We recommend using your business or website name.

For example:

`yourbusiness-website`

4. Keep the repository **Private** unless Cyberdelia tells you otherwise.
5. Click **Create repository**.

You don't need to add any files yet unless Cyberdelia specifically asks you to.

---

# 2. Give Cyberdelia Access to GitHub

Once your repository has been created, Cyberdelia can be added as a collaborator.

### Add Cyberdelia

1. Open your repository.
2. Go to **Settings**.
3. Look for **Collaborators** or **Collaborators and teams**.
4. Click **Add people**.
5. Enter:

**[cybderdeliatech@gmail.com](mailto:cybderdeliatech@gmail.com)**

6. Send the invitation.

Cyberdelia will receive the invitation and can then work with the website files.

### Why do we do this?

You remain the owner of the GitHub account and repository.

Cyberdelia simply receives the access necessary to build, update, and maintain your website.

If you ever decide to work with another developer, you can remove our access.

---

# 3. Create a Cloudflare Account

Cloudflare helps manage important parts of your website, including DNS, security, SSL, and website performance.

Create your own Cloudflare account rather than having Cyberdelia create one for you.

Visit:

https://www.cloudflare.com/

Click **Sign Up** and create your account.

Use an email address that you control.

---

# 4. Add Your Website to Cloudflare

After creating your Cloudflare account:

1. Log in to Cloudflare.
2. Select **Add a site**.
3. Enter your domain name.

For example:

`yourbusiness.com`

4. Follow the Cloudflare setup instructions.
5. Cloudflare will provide nameservers for your domain.
6. Your domain registrar will need to be updated with those nameservers.

**Important:** Don't change your nameservers unless you are comfortable doing so or Cyberdelia has instructed you to.

If you're not sure what to do, stop at this point and let us know.

We can help you through the process.

---

# 5. Connecting Your Website to Cloudflare

Once your domain is connected to Cloudflare, Cyberdelia can configure the DNS settings required for your website.

Depending on your website setup, this may include:

* Website hosting
* DNS records
* SSL
* Redirects
* Email-related DNS records
* Domain verification
* Website security settings

The goal is to keep everything under **your Cloudflare account**, rather than putting your domain inside someone else's account.

That means you retain control.

---

# 6. Connecting Your GitHub Repository to Your Website

If your website is being hosted through a service that connects to GitHub, Cyberdelia can connect the repository to the hosting platform.

This allows the website to be updated from the repository.

The basic process is:

**Your GitHub Repository → Website Hosting → Your Domain**

When changes are made to the website, the hosting system can pull the updated files from GitHub.

You don't need to understand the technical details.

Cyberdelia will handle the configuration.

---

# 7. Need a Contact Form?

If your website needs a contact form, booking inquiry form, quote request form, or another form that sends email, we may use **EmailJS**.

EmailJS allows a website form to send messages to your email without requiring us to build a complicated email server.

---

# 8. Create an EmailJS Account

Visit:

https://www.emailjs.com/

Click **Sign Up**.

Create the account using an email address you control.

Verify your email address.

---

# 9. Connect Your Email Account to EmailJS

Once you're logged in:

1. Go to **Email Services**.
2. Add a new email service.
3. Select your email provider.
4. Follow the instructions to connect the account.

Depending on your email provider, you may be asked to authorize EmailJS to send emails through your account.

**Do not give Cyberdelia your email password.**

You should connect your own email account directly through EmailJS.

---

# 10. Create an EmailJS Template

After connecting your email service:

1. Go to **Email Templates**.
2. Create a new template.
3. Add the information you want to receive from your website form.

For example:

**Name:**
{{name}}

**Email:**
{{email}}

**Phone:**
{{phone}}

**Message:**
{{message}}

Cyberdelia can provide the exact fields your website needs.

---

# 11. Give Cyberdelia the EmailJS Information

Your website will need the appropriate EmailJS configuration information.

Cyberdelia may ask you for information such as:

* Public Key
* Service ID
* Template ID

These allow the website form to communicate with EmailJS.

**Never send your email password to Cyberdelia.**

---

# 12. Test Your Contact Form

After the website is connected, Cyberdelia will test the form.

We recommend sending a test message yourself as well.

Check:

* Did the form submit?
* Did you receive the email?
* Did the customer's information arrive correctly?
* Did the reply-to email work?
* Did the confirmation message appear?

This helps make sure your website is ready to receive leads.

---

# Your Accounts Stay Yours

The important thing to remember is that these accounts belong to **you**.

Cyberdelia may help configure and manage them, but we don't need to own them.

You should have control over:

* Your domain
* Your GitHub account
* Your website repository
* Your Cloudflare account
* Your email account
* Your EmailJS account
* Your website

If you ever decide to move your website to another developer, hosting company, or platform, you should be able to do so.

That's intentional.

## No Lock-In

We don't believe you should have to stay with a website company because your website is trapped inside their proprietary system.

Your website should be portable.

Your accounts should be yours.

Your domain should be yours.

Your content should be yours.

Your data should be yours.

Cyberdelia is here to build, maintain, and improve your website — not to hold it hostage.

---

# What Cyberdelia Handles

You don't need to become a web developer to use this system.

Once your accounts are created, Cyberdelia can handle the technical setup, including:

* Website development
* Repository setup
* Hosting configuration
* Cloudflare configuration
* DNS configuration
* SSL
* Website deployment
* Contact forms
* EmailJS configuration
* Website updates
* Maintenance
* Performance improvements
* Basic SEO structure
* Form testing and monitoring

We'll tell you when we need something from you.

## Questions?

If you get stuck anywhere during setup, stop and contact Cyberdelia.

**Don't guess at DNS settings or delete anything if you're unsure.**

We'd rather help you through a step than have you accidentally disconnect your domain or email.

### Cyberdelia

**Authentic websites. Honest technology. No lock-in.**

You own it. We build it.
