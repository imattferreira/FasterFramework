import { isParamTemplate, sanitizeParams } from '../../utils';

type ExtractOptionalParamsFn = (url: string, path: string) => Record<string, unknown>;

const extractOptionalParams: ExtractOptionalParamsFn = (url, path) => {
  const optionalParams: Record<string, unknown> = {};

  const urlParams = sanitizeParams(url);
  const pathParams = sanitizeParams(path);

  pathParams.forEach((param, index) => {
    if (isParamTemplate(param)) {
      optionalParams[param] = urlParams[index];
    }
  });

  return optionalParams;
};

export default extractOptionalParams;
