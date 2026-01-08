# Formulário Inteligente (Lead / Contato / Orçamento)

## Objetivo

Capturar dados de usuários (leads, pedidos de contato ou orçamento) a partir de um formulário no frontend e processar essas informações de forma automatizada no backend utilizando **n8n**.

---

## Fluxo da Aplicação

1. **Next.js**

   - Exibe o formulário para o usuário
   - Gerencia validação básica no frontend

2. **Envio do Formulário**

   - Requisição `POST` para o **Webhook do n8n**
   - Payload em JSON

3. **n8n (Backend)**
   - Recebe os dados via Webhook
   - Valida os campos
   - Processa regras de negócio
   - Salva os dados no **Supabase**

---

## Stack Tecnológica

### Frontend

- **Next.js**
- **React Hook Form**
- (Opcional) **Zod** para validação
- **Tailwind CSS** para UI

### Backend

- **n8n**
  - Webhook (`POST`)
  - Nodes de validação
  - Banco de dados (**Supabase**)
