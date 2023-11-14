# Enkabot

A discord and revolt bot for [https://enka.network/](https://enka.network)

### How to setup your development environment

1. #### Clone the repository
    ```shell
    git clone https://github.com/thijnmens/enkabot
    ```
2. #### Install dependencies
    ```shell
    yarn install
    ```
3. #### Create configuration files
    ```shell
    node --eval "fs.writeFileSync('.env','{\nREVOLT_TOKEN=\nDISCORD_TOKEN=\n}')"
    ```
4. #### Add your bot tokens

    Open the newly created `.env` file and add your discord/revolt tokens

5. #### Run the project
    ###### Both
    ```shell
    yarn dev
    ```
    ###### Discord only
    ```shell
    yarn dev:discord
    ```
    ###### Revolt only
    ```shell
    yarn dev:revolt
    ```
