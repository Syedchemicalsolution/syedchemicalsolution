# The Century Scents - Chemical Solutions Website

A modern, responsive e-commerce website for chemical solutions and fragrances.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Product Management**: Full admin panel for managing products and website settings
- **Shopping Cart**: Complete shopping cart functionality with local storage
- **Hero Animations**: Multiple animation options for the hero section
- **Search & Filter**: Product search and sorting functionality
- **Contact Form**: Professional contact form with validation
- **Modern UI**: Clean, professional design with smooth animations

## File Structure

\`\`\`
├── index.html              # Homepage
├── shop.html              # Products page
├── about.html             # About us page
├── contact.html           # Contact page
├── admin.html             # Admin panel
├── assets/
│   ├── css/
│   │   ├── styles.css     # Main stylesheet
│   │   └── admin.css      # Admin panel styles
│   ├── js/
│   │   ├── main.js        # Main JavaScript functionality
│   │   ├── shop.js        # Shop page specific functions
│   │   ├── contact.js     # Contact form handling
│   │   └── admin.js       # Admin panel functionality
│   └── images/
│       └── favicon.ico    # Website favicon
└── README.md              # This file
\`\`\`

## Deployment Instructions

### 1. GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify

1. Create account on [Netlify](https://netlify.com)
2. Drag and drop your project folder to Netlify dashboard
3. Or connect your GitHub repository
4. Your site will be deployed automatically
5. You'll get a URL like `https://random-name.netlify.app`

### 3. Vercel

1. Create account on [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. In your project folder, run: `vercel`
4. Follow the prompts
5. Or connect your GitHub repository through Vercel dashboard

### 4. Other Hosting Providers

For traditional web hosting (cPanel, etc.):
1. Upload all files to your hosting's public_html folder
2. Ensure index.html is in the root directory
3. Your site will be accessible via your domain

## Admin Panel

Access the admin panel by visiting `/admin.html` or clicking the admin button on the website.

**Features:**
- Website settings management
- Product management (add, edit, delete)
- Hero section customization
- Real-time preview updates

## Customization

### Colors
Edit the CSS variables in `assets/css/styles.css`:
\`\`\`css
:root {
  --primary-color: #d97706;
  --secondary-color: #b45309;
}
\`\`\`

### Products
Use the admin panel to manage products, or edit the default products in `assets/js/main.js`.

### Content
All text content can be modified through the admin panel or by editing the HTML files directly.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).
