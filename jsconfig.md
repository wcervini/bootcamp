# jsconfig.json

## ¿Qué es jsconfig.json?

La presencia del archivo `jsconfig.json` en un directorio indica que dicho directorio es la raíz de un proyecto de JavaScript. El archivo `jsconfig.json` especifica los archivos raíz y las opciones para las funcionalidades proporcionadas por el [servicio de lenguaje de JavaScript](https://github.com/microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio).

> **Consejo:** Si no estás utilizando JavaScript, no necesitas preocuparte por `jsconfig.json`.

> **Consejo:** `jsconfig.json` es un descendiente de [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), que es un archivo de configuración para TypeScript. `jsconfig.json` es `tsconfig.json` con el atributo `"allowJs"` establecido en `true`.

## ¿Por qué necesito un archivo jsconfig.json?

El soporte de JavaScript en Visual Studio Code puede ejecutarse en dos modos diferentes:

- **Ámbito de archivo - sin jsconfig.json**: En este modo, los archivos JavaScript abiertos en Visual Studio Code se tratan como unidades independientes. Mientras un archivo `a.js` no haga referencia explícita a un archivo `b.ts` (ya sea mediante `import` o [módulos](https://wiki.commonjs.org/wiki/Modules/1.0) de **CommonJS**), no hay un contexto de proyecto común entre ambos archivos.

- **Proyecto explícito - con jsconfig.json**: Un proyecto de JavaScript se define mediante un archivo `jsconfig.json`. La presencia de dicho archivo en un directorio indica que el directorio es la raíz de un proyecto de JavaScript. El propio archivo puede listar opcionalmente los archivos que pertenecen al proyecto, los archivos que se deben excluir del proyecto, así como las opciones del compilador (véase más abajo).

La experiencia de desarrollo en JavaScript mejora cuando tienes un archivo `jsconfig.json` en tu espacio de trabajo que define el contexto del proyecto. Por este motivo, ofrecemos una sugerencia para crear un archivo `jsconfig.json` cuando abres un archivo JavaScript en un espacio de trabajo nuevo.

### Ubicación de jsconfig.json

Definimos esta parte de nuestro código, el lado cliente de nuestro sitio web, como un proyecto de JavaScript creando un archivo `jsconfig.json`. Coloca el archivo en la raíz de tu código JavaScript como se muestra a continuación.

![configuración de jsconfig](images/javascript/jsconfig_setup.png)

En proyectos más complejos, puedes tener más de un archivo `jsconfig.json` definido dentro de un espacio de trabajo. Esto es recomendable para que el código de un proyecto no se sugiera como IntelliSense en el código de otro proyecto. A continuación se muestra un proyecto con una carpeta `client` y una carpeta `server`, ilustrando dos proyectos de JavaScript separados.

![múltiples jsconfigs](images/javascript/complex_jsconfig_setup.png)

## Ejemplos

Por defecto, el servicio de lenguaje de JavaScript analizará y proporcionará IntelliSense para todos los archivos de tu proyecto de JavaScript. Deberás especificar qué archivos excluir o incluir para proporcionar el IntelliSense adecuado.

### Uso de la propiedad `"exclude"`

El atributo `exclude` (un [patrón glob](/docs/editor/glob-patterns.md)) indica al servicio de lenguaje qué archivos no forman parte de tu código fuente. Esto mantiene un alto nivel de rendimiento. Si IntelliSense es lento, añade carpetas a tu lista `exclude` (VS Code te sugerirá hacerlo si detecta una ralentización).

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES6"
  },
  "exclude": ["node_modules"]
}
```

> **Consejo:** Deberás excluir los archivos generados por un proceso de compilación (por ejemplo, un directorio `dist`). Estos archivos provocarán que las sugerencias aparezcan dos veces y ralentizarán IntelliSense.

### Uso de la propiedad `"include"`

Alternativamente, puedes establecer explícitamente los archivos de tu proyecto mediante el atributo `include` (un [patrón glob](/docs/editor/glob-patterns.md)). Si no hay un atributo `include`, se incluyen por defecto todos los archivos del directorio y subdirectorios contenedores. Cuando se especifica un atributo `include`, solo se incluyen esos archivos. A continuación se muestra un ejemplo con un atributo `include` explícito.

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES6"
  },
  "include": ["src/**/*"]
}
```

> **Consejo:** Las rutas de archivo en `exclude` e `include` son relativas a la ubicación de `jsconfig.json`.

## Opciones de jsconfig

A continuación se muestran las `"compilerOptions"` de `jsconfig` para configurar el soporte de lenguaje de JavaScript.

> **Consejo:** No te dejes confundir por `compilerOptions`, ya que no se requiere una compilación real para JavaScript. Este atributo existe porque `jsconfig.json` es un descendiente de `tsconfig.json`, que se utiliza para compilar TypeScript.

| Opción                         | Descripción                                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `noLib`                        | No incluir el archivo de biblioteca predeterminado (lib.d.ts)                                                                                                                              |
| `target`                       | Especifica qué biblioteca predeterminada (lib.d.ts) usar. Los valores son "ES3", "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ES2023", "ESNext". |
| `module`                       | Especifica el sistema de módulos al generar código de módulos. Los valores son "AMD", "CommonJS", "ES2015", "ES2020", "ES2022", "ES6", "Node16", "NodeNext", "ESNext", "None", "System", "UMD".  |
| `moduleResolution`             | Especifica cómo se resuelven los módulos para las importaciones. Los valores son "Node", "Classic", "Node16", "NodeNext", "Bundler".                                                        |
| `checkJs`                      | Habilita la verificación de tipos en archivos JavaScript.                                                                                                                                   |
| `experimentalDecorators`       | Habilita el soporte experimental para los decoradores propuestos de ES.                                                                                                                     |
| `allowSyntheticDefaultImports` | Permite importaciones predeterminadas de módulos sin exportación predeterminada. Esto no afecta a la generación de código, solo a la verificación de tipos.                                  |
| `baseUrl`                      | Directorio base para resolver nombres de módulos no relativos.                                                                                                                               |
| `paths`                        | Especifica el mapeo de rutas que se calculará en relación con la opción baseUrl.                                                                                                            |

Puedes leer más sobre las `compilerOptions` disponibles en la [documentación de compilerOptions de TypeScript](https://www.typescriptlang.org/tsconfig#compilerOptions).

## Uso de alias de webpack

Para que IntelliSense funcione con alias de webpack, necesitas especificar las claves `paths` con un [patrón glob](/docs/editor/glob-patterns.md).

Por ejemplo, para el alias 'ClientApp':

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["./ClientApp/*"]
    }
  }
}
```

y luego usar el alias

```js
import Something from "ClientApp/foo";
```

## Buenas prácticas

Siempre que sea posible, debes excluir las carpetas con archivos JavaScript que no formen parte del código fuente de tu proyecto.

> **Consejo:** Si no tienes un `jsconfig.json` en tu espacio de trabajo, VS Code excluirá por defecto la carpeta `node_modules`.

A continuación se muestra una tabla que relaciona los componentes habituales de un proyecto con sus carpetas de instalación que se recomienda excluir:

| Componente                     | Carpeta a excluir                                 |
| ------------------------------ | ------------------------------------------------- |
| `node`                         | excluir la carpeta `node_modules`                 |
| `webpack`, `webpack-dev-server`| excluir la carpeta de contenido, por ejemplo `dist`. |
| `bower`                        | excluir la carpeta `bower_components`             |
| `ember`                        | excluir las carpetas `tmp` y `temp`               |
| `jspm`                         | excluir la carpeta `jspm_packages`                |

Cuando tu proyecto de JavaScript crece demasiado y el rendimiento disminuye, suele ser debido a carpetas de bibliotecas como `node_modules`. Si VS Code detecta que tu proyecto está creciendo demasiado, te sugerirá editar la lista `exclude`.
