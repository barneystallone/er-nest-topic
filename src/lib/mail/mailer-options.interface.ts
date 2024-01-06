/**
 * @see  https://nodemailer.com/about/#example
 */
export interface MailerModuleOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  retry: number;
}
