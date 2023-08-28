export const UserSchema = {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },

    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "string",
    },
    {
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
    },
  ],
  //   name: "user",
  //   title: "User",
  //   type: "document",
  //   fields: [
  //     {
  //       name: "name",
  //       title: "Name",
  //       type: "string",
  //     },
  //     {
  //       name: "email",
  //       title: "Email",
  //       type: "string",
  //     },
  //     {
  //       name: "image",
  //       title: "Image",
  //       type: "url",
  //     },
  //     // {
  //     //   name: "password",
  //     //   title: "Password",
  //     //   type: "string",
  //     // },
  //     {
  //       // this is only if you use credentials provider
  //       name: "password",
  //       type: "string",
  //       hidden: true,
  //     },
  //     {
  //       name: "emailVerified",
  //       type: "datetime",
  //       hidden: true,
  //     },
  //   ],
};
