type ExtractOptionalParamsFn = (url: string, path: string) => Record<string, unknown>;

const extractOptionalParams: ExtractOptionalParamsFn = (url, path) => {
  let optionalParams: Record<string, unknown> = {};

  const urlParams = url.split('/').filter(Boolean);
  const pathParams = path.split('/').filter(Boolean);

  pathParams.forEach((param, index) => {
    if (param.includes(':')) {
      optionalParams[param] = urlParams[index];
    }
  });

  return optionalParams;
}

export default extractOptionalParams;
