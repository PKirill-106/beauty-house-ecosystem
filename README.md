# Beauty Industry Marketplace Platform

A unified commerce platform for brands that own both manufacturing and retail channels in the beauty industry.

## The Problem

Our client operates both a beauty product manufacturing business and a retail marketplace for salons.  
Maintaining separate systems for production, wholesale, and retail leads to:

- duplicated logic and infrastructure  
- inconsistent product, pricing, and stock data  
- complex synchronization between systems  
- slower development and higher maintenance costs  

## The Solution

A single shared backend with two independent frontend applications, each exposing only the functionality relevant to its users.

- **One backend** - unified data, business logic, and integrations  
- **Two frontends** - tailored UX via role-based and feature-based filtering  

## Platform Structure

### Professional Beauty House

A clean and focused storefront for beauty salons:

- product catalog  
- shopping cart and checkout  
- order history  
- salon-oriented pricing and availability  

### Delight Manufacturer Portal

An extended interface for the manufacturer:

- full access to salon features  
- advanced inventory management  
- wholesale pricing rules  
- product lifecycle and stock control  

## Technical Highlights

- **Single Backend Core** shared across all business flows  
- **Role & Feature Filtering** implemented at the frontend level  
- **Modular Architecture** enabling feature extension without duplication  
- **Consistent Authentication & Commerce Logic** across both applications  

## Technology Stack

- **Backend**: .NET (ASP.NET Core)  
- **Frontend**: Next.js  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **Infrastructure**: Docker, Nginx  

## Who Is This For?

- **Beauty Salons** - streamlined and intuitive shopping experience  
- **Manufacturing Owner** - full operational control from a single system  
