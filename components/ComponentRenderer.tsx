'use client';

import React from 'react';
import { ProjectSchema } from '@/lib/project-schema';

interface ComponentRendererProps {
  data: ProjectSchema;
  theme: ProjectSchema['theme'];
}

// Hero Component
function HeroComponent({ content, style }: any) {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 text-center"
      style={{
        backgroundColor: style?.backgroundColor || '#ffffff',
        color: style?.textColor || '#000000',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">{content.title}</h1>
        <p className="text-xl mb-8 opacity-90">{content.subtitle}</p>
        {content.imageUrl && (
          <img src={content.imageUrl} alt="Hero" className="w-full mb-8 rounded-lg" />
        )}
        {content.ctaText && (
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-bold text-lg">
            {content.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}

// Text Component
function TextComponent({ content, style }: any) {
  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: style?.backgroundColor || '#ffffff',
        color: style?.textColor || '#000000',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {content.title && <h2 className="text-3xl font-bold mb-4">{content.title}</h2>}
        <p className="text-lg leading-relaxed">{content.body}</p>
      </div>
    </section>
  );
}

// Image Component
function ImageComponent({ content, style }: any) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8" style={style}>
      <div className="max-w-4xl mx-auto">
        {content.altText && <p className="mb-4 font-semibold">{content.altText}</p>}
        <img src={content.url} alt={content.altText} className="w-full rounded-lg" />
      </div>
    </section>
  );
}

// Card Component
function CardComponent({ content, style }: any) {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: style?.backgroundColor || '#f9fafb',
        color: style?.textColor || '#000000',
        border: `1px solid ${style?.borderColor || '#e5e7eb'}`,
      }}
    >
      {content.title && <h3 className="text-xl font-bold mb-2">{content.title}</h3>}
      <p className="text-gray-700">{content.description}</p>
    </div>
  );
}

// Feature Grid Component
function FeatureGridComponent({ content, style }: any) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={style}>
      <div className="max-w-6xl mx-auto">
        {content.title && <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>}
        <div className="grid md:grid-cols-3 gap-8">
          {content.features?.map((feature: any, idx: number) => (
            <div key={idx} className="text-center">
              {feature.icon && <div className="text-4xl mb-4">{feature.icon}</div>}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Component
function GalleryComponent({ content, style }: any) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={style}>
      <div className="max-w-6xl mx-auto">
        {content.title && <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>}
        <div className="grid md:grid-cols-3 gap-6">
          {content.images?.map((image: any, idx: number) => (
            <img key={idx} src={image.url} alt={image.alt} className="w-full h-64 object-cover rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Component
function TestimonialsComponent({ content, style }: any) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={style}>
      <div className="max-w-6xl mx-auto">
        {content.title && <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>}
        <div className="grid md:grid-cols-2 gap-8">
          {content.testimonials?.map((testimonial: any, idx: number) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 mb-4">\"${testimonial.quote}\"</p>
              <p className="font-bold">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Component
function PricingComponent({ content, style }: any) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={style}>
      <div className="max-w-6xl mx-auto">
        {content.title && <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>}
        <div className="grid md:grid-cols-3 gap-8">
          {content.plans?.map((plan: any, idx: number) => (
            <div key={idx} className="border rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">${plan.price}</p>
              <ul className="text-left mb-8 space-y-2">
                {plan.features?.map((feature: string, fidx: number) => (
                  <li key={fidx} className="text-gray-600">✓ {feature}</li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Component
function ContactComponent({ content, style }: any) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={style}>
      <div className="max-w-2xl mx-auto">
        {content.title && <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Your message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

// Footer Component
function FooterComponent({ content, style }: any) {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: style?.backgroundColor || '#1f2937',
        color: style?.textColor || '#ffffff',
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-4">&copy; {content.copyright || new Date().getFullYear()}. All rights reserved.</p>
        {content.links && (
          <div className="flex gap-6 justify-center">
            {content.links.map((link: any, idx: number) => (
              <a key={idx} href={link.url} className="hover:underline">
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

// Navbar Component
function NavbarComponent({ content, style }: any) {
  return (
    <nav
      className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: style?.backgroundColor || '#ffffff',
        color: style?.textColor || '#000000',
        borderBottom: `1px solid ${style?.borderColor || '#e5e7eb'}`,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="font-bold text-xl">{content.brandName}</div>
        <div className="flex gap-6">
          {content.links?.map((link: any, idx: number) => (
            <a key={idx} href={link.url} className="hover:opacity-75">
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

interface SectionProps {
  section: any;
  theme: any;
}

function renderSection({ section, theme }: SectionProps) {
  const props = { content: section.content, style: section.style };

  switch (section.type) {
    case 'hero':
      return <HeroComponent key={section.id} {...props} />;
    case 'text':
      return <TextComponent key={section.id} {...props} />;
    case 'image':
      return <ImageComponent key={section.id} {...props} />;
    case 'card':
      return <CardComponent key={section.id} {...props} />;
    case 'featureGrid':
      return <FeatureGridComponent key={section.id} {...props} />;
    case 'gallery':
      return <GalleryComponent key={section.id} {...props} />;
    case 'testimonials':
      return <TestimonialsComponent key={section.id} {...props} />;
    case 'pricing':
      return <PricingComponent key={section.id} {...props} />;
    case 'contact':
      return <ContactComponent key={section.id} {...props} />;
    case 'footer':
      return <FooterComponent key={section.id} {...props} />;
    case 'navbar':
      return <NavbarComponent key={section.id} {...props} />;
    default:
      return null;
  }
}

export function ComponentRenderer({ data, theme }: ComponentRendererProps) {
  return (
    <div>
      {data.pages?.map((page) => (
        <div key={page.path}>
          {page.sections?.map((section) => renderSection({ section, theme: data.theme }))}
        </div>
      ))}
    </div>
  );
}
