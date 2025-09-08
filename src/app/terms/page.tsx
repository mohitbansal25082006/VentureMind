// src/app/terms/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle, 
  Shield, 
  Gavel,
  Users,
  DollarSign,
  AlertTriangle,
  Calendar,
  ArrowRight,
  Download,
  Mail
} from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        {
          heading: "Agreement",
          text: "By accessing and using VentureMind's Services, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          heading: "Use of Services",
          text: "If you do not agree to abide by the above, please do not use our Services."
        },
        {
          heading: "Modifications",
          text: "VentureMind reserves the right to modify these terms at any time. Your continued use of the Services constitutes acceptance of the modified terms."
        }
      ]
    },
    {
      title: "Use License",
      icon: CheckCircle,
      content: [
        {
          heading: "Permission",
          text: "Permission is granted to temporarily download one copy of the materials on VentureMind's website for personal, non-commercial transitory viewing only."
        },
        {
          heading: "Restrictions",
          text: "You may not modify, copy, reproduce, republish, upload, post, transmit, or distribute the materials in any way."
        },
        {
          heading: "Commercial Use",
          text: "This license does not include any resale or commercial use of the Services or its contents."
        }
      ]
    },
    {
      title: "Disclaimer",
      icon: AlertTriangle,
      content: [
        {
          heading: "As Is",
          text: "The materials on VentureMind's website are provided on an 'as is' basis. VentureMind makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties."
        },
        {
          heading: "Limitations",
          text: "In no event shall VentureMind or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials."
        }
      ]
    },
    {
      title: "User Accounts",
      icon: Users,
      content: [
        {
          heading: "Registration",
          text: "You may be required to create an account to access certain features of our Services. You agree to provide accurate, current, and complete information during the registration process."
        },
        {
          heading: "Security",
          text: "You are responsible for safeguarding your account information and for all activities that occur under your account."
        },
        {
          heading: "Termination",
          text: "VentureMind may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever."
        }
      ]
    },
    {
      title: "Payment Terms",
      icon: DollarSign,
      content: [
        {
          heading: "Subscription Fees",
          text: "Certain features of our Services may require payment of subscription fees. You agree to pay all fees at the rates in effect when the charges are incurred."
        },
        {
          heading: "Billing",
          text: "All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, and you shall be responsible for payment of all such taxes, levies, or duties."
        },
        {
          heading: "Refunds",
          text: "Except as required by law, paid fees are non-refundable. We reserve the right to modify our fees at any time with prior notice."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        {
          heading: "Ownership",
          text: "The Services and their original content, features, and functionality are and will remain the exclusive property of VentureMind and its licensors."
        },
        {
          heading: "User Content",
          text: "You retain ownership of any intellectual property rights you hold in the content you submit to the Services. By submitting content, you grant VentureMind a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content."
        },
        {
          heading: "Trademarks",
          text: "VentureMind, the VentureMind logo, and other trademarks, service marks, graphics, and logos used in connection with our Services are trademarks or registered trademarks of VentureMind."
        }
      ]
    },
    {
      title: "Prohibited Activities",
      icon: Gavel,
      content: [
        {
          heading: "Illegal Activities",
          text: "You may not use our Services for any illegal purposes or in any way that violates applicable laws."
        },
        {
          heading: "Harmful Activities",
          text: "You may not upload or distribute viruses, malware, or any other code that could harm our Services or other users."
        },
        {
          heading: "Unauthorized Access",
          text: "You may not attempt to gain unauthorized access to our Services, other accounts, computer systems, or networks."
        }
      ]
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        {
          heading: "No Warranty",
          text: "Our Services are provided 'as is' without any warranties, express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement."
        },
        {
          heading: "Cap on Liability",
          text: "In no event shall VentureMind, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages."
        },
        {
          heading: "Exceptions",
          text: "Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for consequential or incidental damages, so these limitations may not apply to you."
        }
      ]
    },
    {
      title: "Governing Law",
      icon: Gavel,
      content: [
        {
          heading: "Jurisdiction",
          text: "These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions."
        },
        {
          heading: "Disputes",
          text: "Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association."
        },
        {
          heading: "Waiver",
          text: "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Terms of Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Please read these terms carefully before using VentureMind's Services.
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
            <Badge className="mb-4">Terms Summary</Badge>
            <h2 className="text-3xl font-bold mb-6">
              What You Need to Know
            </h2>
            <p className="text-gray-600 text-lg">
              These Terms of Service constitute a legally binding agreement made between you, 
              whether personally or on behalf of an entity, and VentureMind.
            </p>
          </div>
          
          <Card className="border-0 shadow-lg mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Key Points</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Acceptance of terms is required for service use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Services provided 'as is' without warranties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You are responsible for account security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Payment required for premium features</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Your Responsibilities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Provide accurate account information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Use services for lawful purposes only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Respect intellectual property rights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Comply with all applicable laws</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  By using our Services, you agree to these terms and our Privacy Policy. 
                  If you do not agree, you should not use our Services.
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

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Questions About Our Terms?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            If you have any questions or concerns about these Terms of Service, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/privacy">
                View Privacy Policy
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}