import { createParamDecorator } from "@nestjs/common";

export const Account = createParamDecorator((data, req) => {
    return data ? req[data]: req.headers;
}) 