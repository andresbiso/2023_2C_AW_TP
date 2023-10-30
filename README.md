<p align="center">
    Trabajo Práctico Integrador - AW - UP
    <br>
    2C - 2023
    <br>
</p>

# :pencil: Table of Contents

- [Acerca De](#about)
- [Levantar Proyecto](#run_project)
- [Herramientas Utilizadas](#built_using)
- [Probar API](#api_testing)
- [Otros Comentarios](#comments)
- [Autor](#author)
- [Reconocimientos](#acknowledgement)

# :information_source: Acerca De <a name = "about"></a>

- Repositorio que contiene el trabajo práctico de la materia Arquitectura Web de la Universidad de Palermo.

# :wrench: Levantar Proyecto <a name = "run_project"></a>

## Server

1. `npm install`
2. `npm start`

# :hammer: Herramientas Utilizadas <a name = "built_using"></a>

## Herramientas

### Windows

Recomiendo utilizar [chocolatey](https://chocolatey.org/install) para instalar estos paquetes:

- [vscode](https://community.chocolatey.org/packages/vscode)

```
choco install vscode
```

- [nodejs-lts](https://community.chocolatey.org/packages/nodejs-lts) -> v18.18.0

```
choco install nodejs-lts --version 18.18.0
```

- [postman](https://community.chocolatey.org/packages/postman)

```
choco install postman
```

- [googlechrome](https://community.chocolatey.org/packages/googlechrome)

```
choco install googlechrome
```

### macOS

Recomiendo utilizar [homebrew](https://brew.sh/) para instalar estos paquetes:

- [visual-studio-code](https://formulae.brew.sh/cask/visual-studio-code#default)

```
brew install --cask visual-studio-code
```

- [node@18](https://formulae.brew.sh/formula/node@18)

```
brew install node@18
```

- [postman](https://formulae.brew.sh/cask/postman#default)

```
brew install --cask postman
```

- [google-chrome](https://formulae.brew.sh/cask/google-chrome#default)

```
brew install --cask google-chrome
```

## Base de Datos

Este proyecto hace uso de MongoDB y MongoDB Compass.

- https://www.mongodb.com/docs/manual/reference/default-mongodb-port/

### Windows

- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
- [mongodb](https://community.chocolatey.org/packages/mongodb) -> v7.0.1

```
choco install mongodb --version 7.0.1
```

- [mongodb-compass](https://community.chocolatey.org/packages/mongodb-compass) -> v1.40.2

```
choco install mongodb-compass --version 1.40.2
```

### macOS

- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
- [mongodb-community](https://github.com/mongodb/homebrew-brew) -> v7.0

```
brew tap mongodb/brew
brew install mongodb-community@7.0
```

- [mongodb-compass](https://formulae.brew.sh/cask/mongodb-compass) -> v1.40.2

```
brew install --cask mongodb-compass
```

## Paquetes npm

Recomiendo utilizar la versión de npm que viene incluído en la versión de nodejs LTS (v18.17.1) para instalar los paquetes que se encuentran en el archivo package.json y que pueden ser instalados localmente al proyecto con el comando:

```
npm install
```

## Seleccionar versión de node en macOS con Homebrew

- https://benmckay.com/2023/01/20/use-multiple-versions-of-node-with-homebrew/

# :telescope: Probar API <a name = "test_api"></a>

- Hago uso de [postman](https://www.postman.com/) para probar la API.

# :question: Otros Comentarios <a name = "comments"></a>

- La API de Swagger puede ser levantada en: https://editor-next.swagger.io/
- De esa manera se pueden hacer cambios en las definiciones sin necesidad de levantar el entorno.

# :speech_balloon: Autor <a name = "author"></a>

- [@andresbiso](https://github.com/andresbiso)

# :tada: Reconocimientos <a name = "acknowledgement"></a>

- https://github.com/github/gitignore
- https://gist.github.com/rxaviers/7360908 -> github emojis
