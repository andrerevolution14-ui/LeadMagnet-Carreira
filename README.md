# Kit Impulsionador de Carreira - Landing Page

Landing page completa para captura de leads e envio automático de PDF via email.

## 🚀 Tech Stack

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Database e autenticação
- **Resend** - Envio de emails
- **Framer Motion** - Animações

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta Supabase
- Conta Resend
- PDF do kit (colocar em `public/kit.pdf`)

## 🛠️ Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Criar projeto no [Supabase](https://supabase.com)
2. Ir em SQL Editor
3. Executar o schema em `lib/supabase-schema.sql`
4. Copiar URL e keys do projeto

### 3. Configurar Resend

1. Criar conta no [Resend](https://resend.com)
2. Gerar API Key
3. Verificar domínio (opcional, mas recomendado)

### 4. Configurar variáveis de ambiente

Copiar `.env.local.example` para `.env.local` e preencher:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
RESEND_API_KEY=sua_resend_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Adicionar PDF

Colocar o arquivo `kit.pdf` em `public/kit.pdf`

## 🏃 Executar

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Iniciar produção
npm start
```

## 📁 Estrutura

```
├── app/
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Estilos globais
├── components/           # Componentes React
├── lib/                  # Utilitários (Supabase, Resend, Analytics)
├── public/               # Arquivos estáticos
└── types/                # TypeScript types
```

## 🎨 Design

- **Cores**: Azul escuro (#0F172A → #1E293B), Verde (#10B981)
- **Fonte**: Inter (Google Fonts)
- **Estilo**: Minimalista, espaçamento generoso, mobile-first
- **Animações**: Fade-in, parallax leve, glow effects

## 📊 Funcionalidades

- ✅ Captura de email via modal
- ✅ Salva leads no Supabase
- ✅ Envio automático de PDF via Resend
- ✅ Tracking de analytics customizado
- ✅ Contador dinâmico de vagas
- ✅ SEO otimizado
- ✅ PWA ready
- ✅ Responsivo mobile-first

## 🚢 Deploy

### Vercel (Recomendado)

1. Conectar repositório GitHub
2. Configurar variáveis de ambiente no Vercel
3. Deploy automático

```bash
vercel --prod
```

## 📝 Notas

- O PDF deve estar em `public/kit.pdf` para o envio funcionar
- Configure o domínio no Resend para melhor deliverability
- O contador de vagas busca do Supabase (máximo 500)

## 📄 Licença

Privado - Todos os direitos reservados

