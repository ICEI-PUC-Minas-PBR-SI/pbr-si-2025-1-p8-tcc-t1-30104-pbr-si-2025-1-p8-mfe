# Introdução

## Problema

A crescente demanda por interfaces mais dinâmicas e responsivas tem levado ao aumento da complexidade das aplicações
_front-end_. Com a evolução dessas aplicações, torna-se difícil manter a legibilidade, escalabilidade e manutenção do
código, o que pode resultar na introdução de erros e retrabalho.

Como solução, a arquitetura de _Microfrontends_ (MFE) surge como alternativa para modularizar aplicações, permitindo
maior autonomia entre equipes e melhor organização de domínios. No entanto, sua adoção traz desafios, especialmente
relacionados à comunicação entre módulos, como no caso da autenticação, onde é necessário compartilhar informações de
forma segura entre os MFE. A ausência de um padrão pode comprometer a segurança e a experiência do usuário.

Este trabalho propõe a implementação de uma arquitetura de MFE com autenticação única Single Sing-On (SSO), utilizando
_Module Federation_ com Vite. O estudo foi desenvolvido em um cenário simulado de projeto real, com Vue.js no _front-end_
e Auth0 como provedor de autenticação.

A metodologia adotada teve caráter exploratório e experimental, baseada na construção de uma aplicação _showcase_,
permitindo validar a integração entre os MFE e analisar práticas e dificuldades no uso do _Module Federation_ com Vite.

## Objetivos

Este estudo visa avaliar a viabilidade da utilização do Module Federation com Vite para estruturar aplicações _front-end_
em _Microfrontends_ com autenticação por SSO.

Objetivos específicos incluem:
- Construir uma aplicação de exemplo baseada em MFE;
- Integrar autenticação única com SSO via Auth0;
- Investigar a comunicação entre módulos remotos e host;
- Analisar a aplicação do _Module Federation_ com Vite;
- Comparar resultados com a abordagem tradicional no _Webpack_.

## Justificativa

A justificativa do estudo é explorar a aplicabilidade do _Module Federation_ no Vite para a construção de MFE com um
sistema de autenticação utilizando SSO.

## Público-Alvo

O público-alvo deste trabalho são:
- Desenvolvedores front-end que buscam formas de escalar aplicações de forma modular;
- Arquitetos de software interessados em estratégias para modularização e autenticação;
- Empresas que utilizam Vue.js e desejam adotar MFE com SSO;
- Estudantes e pesquisadores da área de desenvolvimento _web_ interessados em arquiteturas modernas.
