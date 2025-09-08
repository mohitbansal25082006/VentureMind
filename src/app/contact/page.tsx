// src/app/contact/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  MessageCircle,
  Users,
  Building,
  Globe,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const offices = [
    {
      city: "San Francisco",
      address: "123 Venture Street, Suite 100\nSan Francisco, CA 94105",
      phone: "+1 (415) 555-0123",
      email: "sf@venturemind.ai",
      hours: "Mon-Fri: 9am-6pm PST"
    },
    {
      city: "New York",
      address: "456 Innovation Ave, Floor 12\nNew York, NY 10001",
      phone: "+1 (212) 555-0456",
      email: "ny@venturemind.ai",
      hours: "Mon-Fri: 9am-6pm EST"
    },
    {
      city: "London",
      address: "789 Tech Hub, Level 5\nLondon, EC1A 1BB, UK",
      phone: "+44 20 7946 0958",
      email: "london@venturemind.ai",
      hours: "Mon-Fri: 9am-6pm GMT"
    }
  ];

  const team = [
    {
      name: "Sales Team",
      email: "sales@venturemind.ai",
      description: "Interested in our enterprise solutions or partnership opportunities?"
    },
    {
      name: "Support Team",
      email: "support@venturemind.ai",
      description: "Need help with your account or have technical questions?"
    },
    {
      name: "Press Inquiries",
      email: "press@venturemind.ai",
      description: "Media inquiries and interview requests."
    },
    {
      name: "Partnerships",
      email: "partners@venturemind.ai",
      description: "Interested in partnering with VentureMind?"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer: "We typically respond to all inquiries within 24 business hours. For urgent matters, please mark your email as &apos;Urgent&apos; and we&apos;ll prioritize your request."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes, we offer phone support for our enterprise customers. For individual users, we provide support through email and our help center."
    },
    {
      question: "Can I schedule a demo of the platform?",
      answer: "Absolutely! We&apos;d be happy to show you how VentureMind works. Please contact our sales team to schedule a personalized demo."
    },
    {
      question: "Do you have an API for developers?",
      answer: "Yes, we offer a comprehensive API that allows developers to integrate our validation capabilities into their own applications."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Whether you have questions, feedback, or partnership opportunities, 
              our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea id="message" rows={5} placeholder="Tell us more about your inquiry..." />
                  </div>
                  
                  <Button size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email Us</h4>
                      <p className="text-gray-600">hello@venturemind.ai</p>
                      <p className="text-sm text-gray-500">For general inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Call Us</h4>
                      <p className="text-gray-600">+1 (888) 555-0123</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Follow Us</h4>
                      <div className="flex gap-3 mt-2">
                        <Link href="https://twitter.com/venturemind" className="text-blue-600 hover:text-blue-800">
                          <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="https://linkedin.com/company/venturemind" className="text-blue-600 hover:text-blue-800">
                          <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="https://instagram.com/venturemind" className="text-blue-600 hover:text-blue-800">
                          <Instagram className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contact Our Teams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {team.map((member, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-blue-600 text-sm">{member.email}</p>
                      <p className="text-gray-600 text-sm mt-1">{member.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Offices</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Visit Us Around the World
            </h2>
            <p className="text-gray-600 text-lg">
              We have teams working across the globe to serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    {office.city}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 whitespace-pre-line">{office.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">{office.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">{office.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">{office.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Frequently Asked Questions</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Common Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our platform and services.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Reach out to us and we&apos;ll be happy to assist you.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">
                Contact Support <Send className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}