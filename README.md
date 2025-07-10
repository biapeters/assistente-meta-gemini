# 🎮 Assistente de Meta para Jogos

Um projeto de portfólio simples em HTML, CSS e JavaScript puro que utiliza a API do Google Gemini para fornecer dicas, estratégias e builds para jogos populares como Valorant, League of Legends e Lost Ark.

---

## ✨ Funcionalidades

* **Prompts Específicos por Jogo:** A IA é otimizada com prompts personalizados para cada jogo selecionado, garantindo respostas mais relevantes e precisas.
* **Integração com Gemini API:** Utiliza o modelo `gemini-2.5-flash` para gerar respostas dinâmicas com base nas perguntas do usuário.
* **Interface Intuitiva:** Um formulário simples para inserir a API Key, selecionar o jogo e fazer a pergunta.
* **Visual Atraente:** Design responsivo com CSS para uma experiência agradável.

---

## 🚀 Como Rodar o Projeto

### Ver Demo Online

Acesse a versão hospedada do projeto diretamente no GitHub Pages:
[**🎮 Assistente de Meta para Jogos - Demo Online**](https://biapeters.github.io/assistente-meta-gemini/)

### Rodar o Projeto Localmente

Para testar este projeto em sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/biapeters/assistente-meta-gemini.git](https://github.com/biapeters/assistente-meta-gemini.git)
    cd assistente-meta-gemini
    ```

2.  **Obtenha sua API Key do Google Gemini:**
    * Vá para o [Google AI Studio](https://aistudio.google.com/app/apikey) ou [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
    * Crie uma nova API Key para o Gemini.
    * **Importante:** Esta chave é pessoal e **não deve ser compartilhada publicamente**.

3.  **Abra o arquivo `index.html`:**
    * Simplesmente abra o arquivo `index.html` em seu navegador de preferência.

4.  **Insira sua API Key:**
    * No campo "Informe a API KEY do Gemini", cole a chave que você obteve no passo 2.
    * Selecione o jogo e digite sua pergunta.
    * Clique em "Perguntar" para ver a resposta da IA!

---

## ⚠️ Atenção sobre a API Key

Este projeto é um exemplo de front-end puro. Por razões de segurança, **a API Key do Google Gemini é solicitada diretamente no navegador**. Isso significa que a chave fica visível no código-fonte do navegador enquanto o projeto está em execução.

Para um projeto em produção, a **melhor prática de segurança é sempre utilizar um backend** para intermediar as requisições à API, mantendo a chave secreta no servidor e fora do alcance do usuário final. Este projeto opta pela simplicidade para fins de portfólio.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5**
* **CSS3**
* **JavaScript**
* **Google Gemini API**
* **Showdown.js** (para converter Markdown em HTML)

---

## 💡 Ideias para Melhorias Futuras

* Implementar um backend (Node.js, Python, etc.) para esconder a API Key.
* Adicionar um histórico de perguntas e respostas.
* Melhorar a interface de usuário com mais feedback visual.
* Expandir a lista de jogos suportados e refinar os prompts.

---

