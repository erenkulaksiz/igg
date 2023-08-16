import {
  IgApiClient,
  IgLoginTwoFactorRequiredError,
  IgLoginBadPasswordError,
  AccountRepositoryLoginResponseLogged_in_user,
} from "instagram-private-api";
import { input } from "@inquirer/prompts";
import type { UserData } from "./types/userdata";

export default async function connect(
  ig: IgApiClient,
  userData: UserData
): Promise<AccountRepositoryLoginResponseLogged_in_user> {
  await ig.simulate.preLoginFlow();

  return ig.account
    .login(userData.username, userData.password)
    .catch(async function (
      err: IgLoginTwoFactorRequiredError | IgLoginBadPasswordError
    ) {
      if (err instanceof IgLoginBadPasswordError) {
        throw new Error("Bad password");
      }

      const { username, totp_two_factor_on, two_factor_identifier } =
        err.response.body.two_factor_info;

      const verificationMethod = totp_two_factor_on ? "0" : "1";

      const code = await input({
        message: `Enter code received via ${
          verificationMethod === "1" ? "SMS" : "TOTP"
        }`,
      });

      return ig.account.twoFactorLogin({
        username,
        verificationCode: code,
        twoFactorIdentifier: two_factor_identifier,
        verificationMethod,
      });
    });
}
