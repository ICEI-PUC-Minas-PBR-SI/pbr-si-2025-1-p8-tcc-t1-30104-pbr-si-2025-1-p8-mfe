# 6 CONCLUSÃO

O presente trabalho teve como objetivo investigar a integração da autenticação Single Sign-On em arquiteturas de
Microfrontends utilizando Vue.js, Vite e Module Federation. A construção da aplicação showcase possibilitou explorar, de
forma prática, os desafios técnicos e as estratégias necessárias para viabilizar a comunicação segura e eficiente entre
módulos isolados.

Os resultados evidenciaram que o uso de cookies HTTP foi eficaz para manter sessões seguras entre domínios, reduzindo a
exposição de dados sensíveis no cliente. Além disso, a aplicação do Module Federation mostrou-se adequada para a
composição dinâmica dos módulos, embora tenha demandado conhecimento técnico aprofundado para lidar com o
compartilhamento de dependências e a configuração de múltiplos projetos em execução simultânea. As análises de
desempenho realizadas confirmaram que a arquitetura proposta apresentou tempos de carregamento satisfatórios,
alinhando-se às melhores práticas de desenvolvimento web.

A arquitetura modular proposta demonstrou benefícios importantes, como maior flexibilidade para a evolução das
aplicações e uma estrutura que favorece o isolamento e a autonomia dos módulos. Entretanto, observou-se que a adoção
dessa abordagem requer planejamento cuidadoso, especialmente em relação à orquestração e à comunicação entre os módulos,
para garantir a coesão e a escalabilidade do sistema. Estratégias como o uso de objetos simulados podem apoiar o
desenvolvimento local, reduzindo a dependência de múltiplos projetos em execução simultânea.

Como trabalhos futuros, recomenda-se a ampliação da investigação em torno de estratégias de autorização baseadas em
escopo, bem como o estudo de soluções que simplifiquem a orquestração e a implantação dos projetos, permitindo melhores
análises e maior eficiência no desenvolvimento. Além disso, sugere-se a realização de testes de desempenho com dados de
campo para validar o comportamento da aplicação em cenários reais de uso, bem como a execução de testes de segurança
automatizados, a fim de identificar e mitigar eventuais vulnerabilidades. 