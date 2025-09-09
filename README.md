

# VentureMind: AI Startup Idea Validator

![VentureMind Banner](public/banner.png)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://venture-mind-roan.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Made with Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Built with TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

VentureMind is a free AI-powered web application that helps entrepreneurs, students, and innovators quickly validate their startup ideas. Instead of spending weeks on market research and feasibility studies, users can input their idea and instantly receive an AI-driven validation report covering market research, competitor analysis, SWOT analysis, monetization strategies, tech feasibility, investment readiness scoring, and auto-generated pitch decks.

## 🌟 Features

### Core Functionality
- **Smart Idea Intake**: Submit your startup idea with clarifying questions for personalized analysis
- **Market Research & Analysis**: Interactive TAM/SAM/SOM charts with market trends and growth rates
- **Competitor Benchmarking**: Direct and indirect competitor analysis with strengths and weaknesses
- **SWOT Analysis**: Comprehensive strengths, weaknesses, opportunities, and threats assessment
- **Risk Assessment**: Risk matrix with impact vs. probability analysis and mitigation strategies
- **Business Model & Monetization**: Revenue stream suggestions ranked by feasibility and scalability
- **Tech Feasibility**: Recommended tech stack, team composition, MVP timeline, and budget estimates
- **Investment Readiness**: 0-100 scoring system with improvement suggestions
- **Report Generation**: Auto-generated pitch deck and one-pager business summary

### User Experience
- **Secure Authentication**: Google OAuth integration with NextAuth.js
- **User Dashboard**: Personalized dashboard to view past reports and analyses
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Interactive Visualizations**: Charts and graphs for data-driven insights
- **Export Options**: Download reports as PDF or Google Slides

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router for optimal performance
- **TypeScript**: Type-safe JavaScript for robust code
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **ShadCN UI**: Beautiful, accessible component library built on Radix UI
- **Recharts**: Composable charting library for data visualization
- **React Hook Form & Zod**: Form validation with minimal re-renders

### Backend & Database
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Type-safe database access
- **PostgreSQL**: Robust relational database (hosted on Neon/Supabase)
- **NextAuth.js**: Authentication framework with Google OAuth

### AI & Integration
- **OpenAI GPT-4**: Advanced language model for comprehensive analysis
- **Crunchbase/AngelList APIs**: Real-time competitor data (stretch feature)

### Deployment
- **Vercel**: Serverless deployment platform with automatic scaling

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon or Supabase recommended)
- OpenAI API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/VentureMind.git
   cd VentureMind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
VentureMind/
├── public/                 # Static assets
│   ├── banner.png         # Project banner
│   └── favicon.ico        # Site icon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   ├── validate/  # Idea validation endpoint
│   │   │   └── reports/   # Report management endpoints
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── landing/       # Landing page components
│   │   ├── ui/            # ShadCN UI components
│   │   └── providers.tsx  # React providers
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── db.ts          # Prisma client
│   │   ├── openai.ts      # OpenAI integration
│   │   ├── utils.ts       # Helper functions
│   │   └── validation.ts  # Validation schemas
│   └── types/             # TypeScript type definitions
├── prisma/                # Database schema
│   └── schema.prisma      # Database model definitions
├── .env.local             # Environment variables (not committed)
├── .gitignore             # Git ignore rules
├── next.config.mjs        # Next.js configuration
├── package.json           # Project dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🗄️ Database Schema

VentureMind uses PostgreSQL with the following main entities:

- **User**: Stores user information from Google OAuth
- **Report**: Stores all validation reports with comprehensive analysis data
- **Account & Session**: Authentication-related entities

Key relationships:
- A User can have multiple Reports
- Reports contain structured data for market analysis, competitors, SWOT, risks, etc.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Sign in to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Set up database**
   - Use Neon, Supabase, or another PostgreSQL provider
   - Add the database URL to environment variables

4. **Run database migrations**
   ```bash
   npx prisma db push
   ```

5. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Other Platforms

The project can be deployed to any platform that supports Next.js with the following requirements:
- Node.js 18+ runtime
- PostgreSQL database
- Environment variables configuration

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | URL of your application | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes |

## 🤝 Contributing

We welcome contributions to VentureMind! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and patterns
- Add TypeScript types for new functionality
- Write clear, concise commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [OpenAI](https://openai.com/) for the powerful GPT-4 model
- [ShadCN UI](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for hosting and deployment platform

---

**VentureMind** - Transform your startup ideas into validated business plans with AI-powered insights.