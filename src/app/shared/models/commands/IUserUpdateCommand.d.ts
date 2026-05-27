interface IUserUpdateCommand extends IBaseCommand {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  nationalCode: string;
  imageId: number;
  signId: number;
}
