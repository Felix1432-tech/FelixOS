# 🚀 Deploy Felix OS no Coolify

## Método: Docker Compose (Mais Simples!)

O Coolify faz tudo automaticamente a partir do `docker-compose.yml`.

---

## 📋 Passo a Passo

### 1. No Coolify, crie novo recurso

1. Acesse seu Coolify
2. Vá em **Resources** → **+ New**
3. Selecione **Docker Compose**
4. Conecte o repositório: `Felix1432-tech/projeto_felix_os`
5. Branch: `main`

### 2. Configure as Variáveis de Ambiente

No Coolify, vá em **Environment Variables** e adicione:

```env
# Banco de Dados
POSTGRES_USER=felixos
POSTGRES_PASSWORD=SuaSenhaForte123!
POSTGRES_DB=felixos

# API
JWT_SECRET=SuaChaveJwtSecreta456!
JWT_EXPIRES_IN=7d

# OpenAI (opcional - para diagnóstico por voz)
OPENAI_API_KEY=sk-sua-chave-aqui

# Frontend - URL da API (IMPORTANTE!)
NEXT_PUBLIC_API_URL=https://api.seudominio.com/api/v1
```

### 3. Configure os Domínios

No Coolify, para cada serviço:

| Serviço | Domínio | Porta |
|---------|---------|-------|
| api | api.seudominio.com | 3000 |
| web | app.seudominio.com | 3001 |

- Ative **HTTPS** (Let's Encrypt automático)

### 4. Deploy!

Clique em **Deploy** e aguarde.

---

## 🔧 Após o Deploy

### Executar Migrations

No Coolify, acesse o terminal do serviço `api`:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Credenciais de Teste

```
Email: admin@demo.com
Senha: demo123
```

---

## ✅ Verificar se Funcionou

- **Frontend**: https://app.seudominio.com
- **API Health**: https://api.seudominio.com/api/health
- **API Docs**: https://api.seudominio.com/api/docs

---

## 🔄 Atualizações Automáticas

Configure o Webhook no GitHub para deploy automático a cada push!

1. No Coolify, copie o Webhook URL
2. No GitHub, vá em Settings → Webhooks → Add webhook
3. Cole a URL e selecione "Push events"

---

## 🆘 Problemas Comuns

### API não conecta no banco
- Verifique se o serviço `db` está saudável
- Confira a senha no `POSTGRES_PASSWORD`

### Frontend mostra erro de conexão
- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Deve ser a URL pública da API (com https://)

### Erro no build
- Veja os logs em **Deployments**
- Geralmente é falta de variável de ambiente

---

## 📊 Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    COOLIFY                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│   │   web   │───▶│   api   │───▶│   db    │       │
│   │ :3001   │    │ :3000   │    │ :5432   │       │
│   │ Next.js │    │ NestJS  │    │Postgres │       │
│   └─────────┘    └─────────┘    └─────────┘       │
│        │              │                            │
│        ▼              ▼                            │
│   app.dominio    api.dominio                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```
