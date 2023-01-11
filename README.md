# Conceitos básicos

## O que é uma aplicação monolítica

- Aplicações "tradicionais"
- "Tudo em um"
- Possui uma única unidade de deployment (deployment de pequenas partes do sistemas precisam ser feitas em conjunto com todo o resto)

## Polêmicas por trás das aplicações monolíticas
- Aplicações da década passada
- Ultrapassada
- Não escalam
- Impedem o crescimento do negócio
- Alto acomplamento

**Grande parte desses argumentos são FALSOS!**

## Quando utilizar monolitos pode ser uma boa

- Novos projetos onde o modelo de negócio não está claro
- Instabilidade no core do negócio
- Evitar complexidade no processo de deploy
- Evitar complexidade na operação
- **Monolith first** - Artigo famoso do Martin Fowler (disponível no blog dele) -> Fala que todo projeto que começou com a ideia de micro-serviços do 0 deu errado

## Monolitos acoplados

- Sistema vai crescendo (Ex.: user começa com dados pessoais, cartões de crédito e compras. Após um tempo, criam-se financiamentos, reclamações, histórico de login, tickets de suporte, carrinhos abandonados, etc.)
- Classes acabam ficando **enormes** (muitos hasMany, hasOne, como no Full), muito difícil de lidar

### Principais problemas com monolitos acoplados
- Não existe contexto
- Entidades que se relacionam
- Não há divisão. Tudo faz parte de tudo. Tudo grudado em tudo
- Efeitos colaterais indesejados (mexer em algo em um lugar da medo de estragar em outro)

## Como evitar o caos dos sistemas monolíticos acoplados
### Pontos de partida
- DDD (Domain Driven Design) -> Criação de contextos ([Como nesta imagem](./docs/images/contexts.png))

### Como fica no final
[Exemplo de como fica o design do sistema](./docs/images/modular_system.png)
- Módulos quebrados em bounded contexts
- Módulos conversam através de contratos e facades
- Entidades podem ser "duplicadas" tendo apenas os atributos necessários
- Ponto importante: uma entidade é identificada por uma ID única. Por isso, as classes/arquivos de, por exemplo, Users, podem se repetir, contendo apenas os atributos necessários para aquele contexto, **desde que sejam mantidos os mesmos ID's entre as classes**
- Equipes especializadas por módulos -> subir código independente, crescer equipe que mexem apenas nos módulos que são responsáveis (**O code owners do github/gitlab pode ajudar nisso aqui**)
- Alta coesão (o que muda junto, permanece junto)

## Monolito modular com separação de base de dados
- [Exemplo de sistema monolítico modular com segregração de dados](./docs/images/db_separation.png)
- Vantagens com relação ao time (times separados mexendod em dados e trechos de código diferentes)
- Traz duplicação de dados
- Ações devem ser sincronizadas (nome de user alterado em uma tabela deve ser alterado em outras tabelas que tem esse mesmo nome) -> problemas de consistência

## E os microsserviços?
### Se é pra segregar tanto, não é melhor já trabalhar com microsserviços?
Em um sistema monolítico modular, mesmo com as complexidades de código e sincronização, você obtem, como vantangens:
- Um único deploy
- Única operação
- Observabilidade simplificada (pronta com APM)
- Sistemas se comunicando internamente (API's são internas, evita problemas de latência, rede, etc.)
- Única linguagem. Menos governança
- **Nunca definir algo que é extremamente complexo com algo extremamente simples** ("já que é assim, faz assim" não é uma frase legal)

## Pontos de atenção
- Os módulos não se preocupam com comunicação externa, pois são códigos que tratam do domínio. Por isso, a camada de framework deve ser reutilizada entre os módulos
- **Shared Kernel** (__seedwork__) -> Algo compartilhado entre os diferentes módulos, mas presente no código de domínio

## Pilares de design/arquitetura de software
### Desacoplamento
Manter as coisas cada vez mais independentes

### Coesão
Coisas que mudam juntas ficarem juntas

# Estrutura do projeto
[Imagem da arquitetura do sistema](./docs/images/architecture.png)
## Comunicação interna
- Um módulo não pode chamar diretamente o caso de uso de outro (gera acoplamento)
- Por isso, ela é dada através de facades (módulos não sabem os internos de outro módulo)
- Dessa forma, um módulo acaba sendo cliente de outro módulo, "simulando" uma chamada a um serviço externo. Isso que garante o desaclopamento entre os módulos
- Isso permite, inclusive, que o outro módulo nem chame um caso de uso, podendo até não trabalhar com clean architecture (os detalhes de como funciona internamente não interessam pro cliente)

## Comunicação externa
- API - Controllers -> Com base na URL o controller joga para o módulo correto
- Corta a aplicação inteira e contem essas regras
- Isso porque os controllers são parte dos módulos, e o acesso dos controllers aos casos de uso não geram dependência entre os módulos
