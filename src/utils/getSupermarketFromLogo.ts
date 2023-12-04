export function getStringAfterLogo(str: string): string {
  const logoIndex = str.indexOf(
    "https://media.easy.com.ar/is/image/EasyArg/logo"
  );

  if (logoIndex !== 0) {
    const nextSpaceIndex = str.indexOf(
      " ",
      logoIndex + "https://media.easy.com.ar/is/image/EasyArg/logo".length
    );
    return str.substring(
      logoIndex + "https://media.easy.com.ar/is/image/EasyArg/logo".length,
      nextSpaceIndex
    );
  } else {
    return "";
  }
}
