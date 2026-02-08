// services/emailService.js
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailService {
  constructor() {
    // Initialize Brevo API client
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.senderEmail = process.env.EMAIL_FROM || 'no-reply@brevo.com';
    this.senderName = process.env.EMAIL_FROM_NAME || 'APD FE';

    if (!process.env.BREVO_API_KEY) {
      console.warn('⚠️ BREVO_API_KEY not found in environment variables');
    } else {
      console.log('✅ Brevo email service initialized');
    }
  }

  /**
   * Load and compile HBS template
   * @param {string} templateName - Name of the template file (without extension)
   * @param {object} data - Data to inject into the template
   * @returns {Promise<string>} - Compiled HTML string
   */
  async loadTemplate(templateName, data) {
    try {
      // Path to templates folder
      const templatePath = path.join(__dirname, '../templates', `${templateName}.hbs`);

      // Read the template file
      const templateSource = await fs.readFile(templatePath, 'utf-8');

      // Compile the template
      const template = handlebars.compile(templateSource);

      // Return compiled HTML with data
      return template(data);
    } catch (error) {
      console.error(`Error loading template ${templateName}:`, error);
      throw new Error(`Failed to load email template: ${templateName}`);
    }
  }

  /**
   * Send email using a template
   * @param {object} options - Email options
   * @param {string} options.to - Recipient email address
   * @param {string} options.subject - Email subject
   * @param {string} options.template - Template name (without extension)
   * @param {object} options.data - Data to inject into template
   * @returns {Promise<object>} - Brevo response
   */
  async sendEmail({ to, subject, template, data }) {
    try {
      // Load and compile template
      const html = await this.loadTemplate(template, data);

      // Send email using Brevo
      const result = await this.apiInstance.sendTransacEmail({
        sender: { email: this.senderEmail, name: this.senderName },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      });

      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  /**
   * Send welcome email to new helper with temporary password
   * @param {object} options - Email options
   * @param {string} options.email - Helper's email address
   * @param {string} options.name - Helper's full name
   * @param {string} options.tempPassword - Temporary password
   * @returns {Promise<object>} - Brevo response
   */
  async sendHelperWelcomeEmail({ email, name, tempPassword }) {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .password-box { background: white; border: 2px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
            .password { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to APD FE! 🎉</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Congratulations! Your volunteer application has been approved, and you've been added as a helper to our team.</p>
              
              <p>We've created an account for you. Here are your login credentials:</p>
              
              <div class="password-box">
                <p style="margin: 0; font-size: 14px; color: #666;">Temporary Password</p>
                <p class="password">${tempPassword}</p>
              </div>
              
              <p><strong>Important:</strong> Please change your password after your first login for security purposes.</p>
              
              <p>You can now access the helper dashboard and start contributing to our mission.</p>
              
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" class="button">Login to Dashboard</a>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>The APD FE Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const result = await this.apiInstance.sendTransacEmail({
        sender: { email: this.senderEmail, name: this.senderName },
        to: [{ email }],
        subject: 'Welcome to APD FE - Your Helper Account is Ready!',
        htmlContent: html,
      });

      console.log('Welcome email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }
}

// Export singleton instance
export default new EmailService();