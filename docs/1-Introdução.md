# 1 INTRODUÇÃO

Nos últimos anos, a tendência de incorporar cada vez mais lógica ao front-end ganhou força. Os usuários passaram a
exigir interfaces mais interativas e serviços de maior qualidade (MEZZALIRA, 2021). Entretanto, os desafios aumentam à
medida que aplicações front-end monolíticas (POWELL e SMALLEY, 2024) crescem com a adição de novas funcionalidades,
melhorias e correções. O crescimento da base de código dificulta a leitura e o entendimento por parte dos
desenvolvedores, tornando a manutenção mais complexa e aumentando o risco de introdução de novos erros (GEERS, 2020).

Para lidar com esse cenário, a arquitetura de Microfrontends (MFE) pode ser aplicada como uma solução potencial. Os MFE
se caracterizam como uma abordagem que promove a divisão do projeto em domínios, permitindo que as equipes tenham maior
autonomia na definição de prioridades e na escolha das estratégias de implementação (GEERS, 2020).

Entretanto, assim como qualquer padrão arquitetural, MFE apresentam desafios de implementação. Entre esses desafios, a
comunicação se destaca como uma das principais decisões a serem tomadas (MEZZALIRA, 2020), uma vez que diferentes MFE
podem precisar compartilhar informações. Um exemplo crítico dessa necessidade ocorre na autenticação de usuários em uma
aplicação web, pois é imprescindível garantir um meio seguro para o compartilhamento de tokens entre os diferentes MFE.
O controle de acesso desempenha um papel indispensável na mitigação de ataques contra a segurança de aplicações web (
BOONKRONG, 2020).

Diante desse cenário, este estudo tem como objetivo geral desenvolver uma aplicação showcase (MFESHOWCASE, 2025) que
exemplifique a autenticação, a integração e o funcionamento de MFE, permitindo a análise das melhores práticas e dos
desafios encontrados durante o desenvolvimento. Especificamente, busca-se explorar a utilização do Module Federation (
WEBPACK, 2020) para a composição de MFE na ferramenta de empacotamento Vite (VITE, 2025), além de investigar a
viabilidade da implementação do método de autenticação única Single Sign-On (SSO) (SCAPICCHIO; FORREST, 2024) em
ambientes baseados em MFE. Como base tecnologica, o projeto utiliza o framework JavaScript Vue.js, amplamente adotado no
desenvolvimento de aplicações front-end (VUE, 2021).

A justificativa para a realização deste estudo fundamenta-se na necessidade de compreender, de forma prática, como o
Module Federation pode ser aplicado em conjunto com o Vite para viabilizar a construção de Microfrontends que atendam a
requisitos de autenticação única por meio do Single Sign-On, contribuindo para o entendimento de seus benefícios e
desafios.

A construção da aplicação viabilizou a avaliação da implementação da autenticação por SSO, além de possibilitar a
identificação das principais dificuldades e facilidades associadas ao uso do Module Federation no Vite. Adicionalmente,
foi realizada uma análise de desempenho e segurança, proporcionando uma visão abrangente dos impactos da arquitetura
escolhida. A principal contribuição da pesquisa consiste em apresentar um padrão para modularização e autenticação no
desenvolvimento de aplicações front-end.

Este trabalho é direcionado a desenvolvedores front-end, arquitetos de software e equipes técnicas envolvidas na
construção de aplicações web escaláveis e modulares. O público-alvo abrange profissionais interessados na adoção da
arquitetura de Microfrontends, especialmente em contextos que utilizam Vue.js e Vite, e que necessitam validar a
possibilidade de autenticação por meio de SSO. Além disso, a solução proposta é relevante para organizações que buscam
aumentar a autonomia entre as equipes de desenvolvimento, sem comprometer a segurança e a coesão da aplicação. 