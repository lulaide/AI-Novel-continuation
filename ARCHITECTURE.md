# Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          User Interface                              │
├─────────────────────────────────────────────────────────────────────┤
│                       Frontend (React)                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Settings  │  │   Input     │  │   Endings   │  │ Continuation │ │
│  │   Modal     │  │   Textarea  │  │   Grid      │  │   Display   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│                     HTTP API Calls                                  │
├─────────────────────────────────────────────────────────────────────┤
│                       Backend (Flask)                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Config    │  │   Endings   │  │ Continuation │                 │
│  │   Handler   │  │   Generator │  │   Generator │                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
├─────────────────────────────────────────────────────────────────────┤
│                      OpenAI API                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │              Chat Completions API                               ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Architecture (React)

```
App.jsx
├── State Management
│   ├── API Configuration (apiKey, baseUrl, model)
│   ├── Novel Content (novelContent, baseNovelForEndings)
│   ├── Endings Management (endings, selectedEnding)
│   ├── UI State (loading states, error messages)
│   └── Settings (maxLength, modal visibility)
├── UI Components
│   ├── Novel Input Area
│   │   ├── Auto-expanding Textarea
│   │   ├── Generate Button
│   │   └── Loading Placeholder
│   ├── Settings Modal
│   │   ├── API Configuration Form
│   │   ├── Validation & Testing
│   │   └── Status Messages
│   ├── Endings Display
│   │   ├── Ending Cards Grid
│   │   ├── Selection Handling
│   │   └── Shimmer Loading
│   └── Continuation Controls
│       ├── Length Selector
│       ├── Generate Button
│       └── Loading States
└── API Integration
    ├── Configuration API
    ├── Endings Generation API
    └── Continuation API
```

### Backend Architecture (Flask)

```
main.py
├── Flask Application Setup
│   ├── Secret Key Configuration
│   ├── Session Management
│   └── CORS Configuration
├── API Endpoints
│   ├── /api/v1/openaiapi (POST)
│   │   ├── Parameter Validation
│   │   ├── OpenAI Client Testing
│   │   └── Session Storage
│   ├── /api/v1/novel/endings (POST)
│   │   ├── Content Validation
│   │   ├── Prompt Engineering
│   │   ├── OpenAI API Call
│   │   └── JSON Response Parsing
│   └── /api/v1/novel/continue (POST)
│       ├── Parameter Validation
│       ├── Continuation Prompt Building
│       ├── OpenAI API Call
│       └── Text Response Processing
└── Error Handling
    ├── Input Validation Errors
    ├── API Configuration Errors
    ├── OpenAI API Errors
    └── JSON Parsing Errors
```

## Data Flow

### 1. API Configuration Flow
```
User Input → Frontend Validation → Backend Validation → OpenAI Test → Session Storage
```

### 2. Endings Generation Flow
```
Novel Content → Frontend → Backend → OpenAI API → JSON Parsing → Frontend Display
```

### 3. Novel Continuation Flow
```
Content + Ending + Length → Frontend → Backend → OpenAI API → Text Processing → Content Append
```

## Technical Stack

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Pure CSS with modern features
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Development**: ESLint for code quality

### Backend
- **Framework**: Flask 3.1.1
- **AI Integration**: OpenAI Python SDK 1.86.0
- **Session Management**: Flask Sessions
- **Error Handling**: Try-catch with user-friendly messages
- **JSON Processing**: Python json module

### External Services
- **AI Service**: OpenAI API (configurable endpoint)
- **Models**: Configurable (default: gpt-3.5-turbo)

## Security Architecture

### Data Protection
- **API Keys**: Stored in server-side sessions, never exposed to client
- **Input Validation**: Server-side validation for all endpoints
- **Error Handling**: Sanitized error messages to prevent information leakage

### Session Security
- **Session Key**: Random 24-byte secret key
- **Session Scope**: Limited to server process lifetime
- **Data Isolation**: User sessions are isolated from each other

## Performance Considerations

### Frontend Optimization
- **Lazy Loading**: Components load as needed
- **Debouncing**: User input debouncing for better UX
- **Caching**: Browser caching for static assets
- **Bundle Size**: Optimized with Vite bundling

### Backend Optimization
- **Async Processing**: Non-blocking API calls
- **Error Caching**: Prevent redundant API calls on errors
- **Session Efficiency**: Minimal session data storage

## Scalability Architecture

### Horizontal Scaling
```
Load Balancer
├── Frontend Server 1 (Nginx)
├── Frontend Server 2 (Nginx)
└── ...

Application Load Balancer
├── Backend Instance 1 (Flask)
├── Backend Instance 2 (Flask)
└── ...
```

### Vertical Scaling
- **Memory**: Increase for session storage
- **CPU**: Increase for concurrent request handling
- **Network**: Optimize for API call bandwidth

## Deployment Architecture

### Development Environment
```
localhost:3000 (Frontend Dev Server)
      ↓
localhost:5000 (Backend Dev Server)
      ↓
OpenAI API
```

### Production Environment
```
CDN (Static Assets)
      ↓
Load Balancer
      ↓
Web Server (Nginx)
      ↓
Application Server (Gunicorn + Flask)
      ↓
OpenAI API
```

## Monitoring and Logging

### Application Monitoring
- **Request Logging**: All API requests and responses
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time and throughput
- **User Analytics**: Usage patterns and feature adoption

### System Monitoring
- **Resource Usage**: CPU, memory, disk usage
- **Network Monitoring**: Bandwidth and latency
- **Service Health**: Uptime and availability
- **External Dependencies**: OpenAI API status

## Future Architecture Improvements

### Microservices Migration
```
API Gateway
├── Authentication Service
├── Novel Processing Service
├── AI Integration Service
└── User Management Service
```

### Database Integration
```
Application Layer
├── User Data Service
├── Novel Storage Service
├── History Service
└── Analytics Service
      ↓
Database Layer (PostgreSQL/MongoDB)
```

### Caching Layer
```
Application
      ↓
Redis Cache
├── Session Cache
├── API Response Cache
└── User Data Cache
```

This architecture provides a solid foundation for the AI novel continuation tool while maintaining flexibility for future enhancements and scaling requirements.