// src/app/privacy/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Lock, 
  Eye,
  Database,
  Cookie,
  Trash2,
  Download,
  Mail,
  Calendar,
  ArrowRight,
  Share
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          heading: "Personal Information",
          text: "When you use our Services, we may collect information that can be used to identify you personally, such as your name, email address, and other contact information."
        },
        {
          heading: "Usage Information",
          text: "We collect information about how you use our Services, including the types of content you view, features you use, and actions you take."
        },
        {
          heading: "Device Information",
          text: "We collect information about the device you use to access our Services, including hardware model, operating system, and unique device identifiers."
        },
        {
          heading: "Cookies and Tracking Technologies",
          text: "We use cookies and similar tracking technologies to track activity on our Services and hold certain information."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          heading: "Provide and Maintain Our Services",
          text: "We use your information to provide, maintain, and improve our Services, process transactions, and send related information."
        },
        {
          heading: "Communicate with You",
          text: "We use your information to communicate with you about our Services, provide support, and respond to your inquiries."
        },
        {
          heading: "Improve Our Services",
          text: "We analyze usage patterns and preferences to better understand how users interact with our Services and to improve them."
        },
        {
          heading: "Personalization",
          text: "We use your information to personalize your experience, such as displaying relevant content and recommendations."
        }
      ]
    },
    {
      title: "How We Share Your Information",
      icon: Share,
      content: [
        {
          heading: "Service Providers",
          text: "We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service."
        },
        {
          heading: "Business Transfers",
          text: "We may share or transfer your information in connection with a merger, acquisition, or sale of company assets."
        },
        {
          heading: "Legal Requirements",
          text: "We may disclose your information if required by law or in response to valid requests by public authorities."
        },
        {
          heading: "With Your Consent",
          text: "We may share your information with third parties with your consent or at your direction."
        }
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          heading: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          heading: "Encryption",
          text: "We encrypt data both in transit and at rest using industry-standard encryption protocols."
        },
        {
          heading: "Access Controls",
          text: "We restrict access to personal information to employees, contractors, and agents who need to know the information to process it."
        },
        {
          heading: "Regular Audits",
          text: "We conduct regular audits of our security practices and systems to ensure they remain effective and up to date."
        }
      ]
    },
    {
      title: "Your Privacy Rights",
      icon: CheckCircle,
      content: [
        {
          heading: "Access and Update",
          text: "You have the right to access, update, or correct your personal information through your account settings."
        },
        {
          heading: "Data Portability",
          text: "You have the right to receive a copy of your personal information in a portable format."
        },
        {
          heading: "Deletion",
          text: "You have the right to request the deletion of your personal information, subject to certain legal exceptions."
        },
        {
          heading: "Opt-Out",
          text: "You have the right to opt-out of receiving marketing communications from us."
        }
      ]
    },
    {
      title: "Children&apos;s Privacy",
      icon: Shield,
      content: [
        {
          heading: "No Services to Children",
          text: "Our Services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13."
        },
        {
          heading: "Parental Consent",
          text: "If we learn that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information."
        },
        {
          heading: "Reporting",
          text: "If you believe that we might have collected information from a child under 13, please contact us immediately."
        }
      ]
    },
    {
      title: "Changes to This Policy",
      icon: Calendar,
      content: [
        {
          heading: "Updates",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons."
        },
        {
          heading: "Notification",
          text: "We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &apos;Last Updated&apos; date."
        },
        {
          heading: "Continued Use",
          text: "Your continued use of our Services after any changes to this Privacy Policy constitutes acceptance of those changes."
        }
      ]
    }
  ];

  const userRights = [
    {
      title: "Right to Access",
      description: "You can request a copy of the personal information we hold about you.",
      icon: Download
    },
    {
      title: "Right to Rectification",
      description: "You can ask us to correct inaccurate or incomplete information.",
      icon: CheckCircle
    },
    {
      title: "Right to Erasure",
      description: "You can ask us to delete your personal information in certain circumstances.",
      icon: Trash2
    },
    {
      title: "Right to Restrict Processing",
      description: "You can ask us to limit how we use your personal information.",
      icon: Lock
    },
    {
      title: "Right to Data Portability",
      description: "You can ask us to transfer your data to another service or provider.",
      icon: Database
    },
    {
      title: "Right to Object",
      description: "You can object to certain types of processing, such as direct marketing.",
      icon: Eye
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Privacy Matters to Us
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              We&apos;re committed to protecting your personal information and being transparent 
              about how we use it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Policy Summary</Badge>
            <h2 className="text-3xl font-bold mb-6">
              What This Policy Covers
            </h2>
            <p className="text-gray-600 text-lg">
              This Privacy Policy explains how VentureMind collects, uses, shares, and protects 
              your personal information when you use our Services.
            </p>
          </div>
          
          <Card className="border-0 shadow-lg mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Information We Collect</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Personal identification information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Usage and interaction data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Device and browser information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cookies and tracking technologies</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">How We Protect Your Data</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Industry-standard encryption protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Strict access controls and authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Regular security audits and assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Compliance with international regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  This policy applies to all users of VentureMind&apos;s Services, including our website, 
                  applications, and other products and services offered by VentureMind.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Detailed Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="font-semibold text-lg mb-2">{item.heading}</h3>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Rights Section */}
      <section id="rights" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Your Rights</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Control Over Your Data
            </h2>
            <p className="text-gray-600 text-lg">
              You have the following rights regarding your personal information:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <right.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{right.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-gray-600">
                    {right.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-0 shadow-md mt-12">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">How to Exercise Your Rights</h3>
              <p className="text-gray-600 mb-6">
                To exercise any of these rights, please contact us using the information below. 
                We will respond to your request within 30 days in accordance with applicable law.
              </p>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <p className="text-gray-600">privacy@venturemind.ai</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            If you have any questions or concerns about this Privacy Policy or our data practices, 
            please don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/terms">
                View Terms of Service
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}