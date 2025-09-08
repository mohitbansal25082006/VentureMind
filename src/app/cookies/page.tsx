// src/app/cookies/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cookie, 
  CheckCircle, 
  Shield, 
  Settings,
  Eye,
  Trash2,
  Calendar,
  ArrowRight,
  Download,
  Mail
} from "lucide-react";
import Link from "next/link";

export default function CookiePolicyPage() {
  const sections = [
    {
      title: "What Are Cookies",
      icon: Cookie,
      content: [
        {
          heading: "Definition",
          text: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences over time."
        },
        {
          heading: "Purpose",
          text: "Cookies are used to collect information about how visitors use websites, which helps website owners improve their sites and provide a better user experience."
        },
        {
          heading: "Types",
          text: "There are different types of cookies, including essential cookies that are necessary for the website to function, and non-essential cookies that are used for analytics, personalization, and advertising."
        }
      ]
    },
    {
      title: "How We Use Cookies",
      icon: Eye,
      content: [
        {
          heading: "Essential Cookies",
          text: "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services."
        },
        {
          heading: "Analytics Cookies",
          text: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site."
        },
        {
          heading: "Functionality Cookies",
          text: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages."
        },
        {
          heading: "Advertising Cookies",
          text: "These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites."
        }
      ]
    },
    {
      title: "Cookie Categories",
      icon: Settings,
      content: [
        {
          heading: "Strictly Necessary Cookies",
          text: "These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. Without these cookies, services you have asked for cannot be provided."
        },
        {
          heading: "Performance Cookies",
          text: "These cookies collect information about how you use our website, which pages you visit, and if you experience any errors. These cookies do not collect any information that could identify you."
        },
        {
          heading: "Functionality Cookies",
          text: "These cookies allow the website to remember choices you make and provide enhanced, more personal features. They may also be used to provide services you have asked for."
        },
        {
          heading: "Targeting or Advertising Cookies",
          text: "These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad."
        }
      ]
    },
    {
      title: "Managing Cookies",
      icon: Shield,
      content: [
        {
          heading: "Cookie Settings",
          text: "You can manage your cookie preferences through our cookie settings panel, which appears when you first visit our website. You can also change your preferences at any time."
        },
        {
          heading: "Browser Controls",
          text: "Most web browsers allow you to control cookies through their settings. However, if you choose to disable cookies, some features of our website may not function properly."
        },
        {
          heading: "Opt-Out",
          text: "You can opt out of certain types of cookies by adjusting your browser settings or by using opt-out tools provided by third parties."
        }
      ]
    },
    {
      title: "Third-Party Cookies",
      icon: Eye,
      content: [
        {
          heading: "Analytics Providers",
          text: "We use third-party analytics providers, such as Google Analytics, to help us understand how users interact with our website. These providers may set cookies on your device."
        },
        {
          heading: "Advertising Partners",
          text: "We work with advertising partners who may use cookies to track your online activity across different websites and deliver targeted advertisements."
        },
        {
          heading: "Social Media",
          text: "Our website may include social media features, such as the 'Like' or 'Share' buttons. These features may set cookies on your device when you use them."
        }
      ]
    },
    {
      title: "Cookie Duration",
      icon: Calendar,
      content: [
        {
          heading: "Session Cookies",
          text: "These cookies are temporary and are deleted when you close your browser. They are used to remember your preferences during a single browsing session."
        },
        {
          heading: "Persistent Cookies",
          text: "These cookies remain on your device for a specified period or until you delete them. They are used to remember your preferences across multiple sessions."
        },
        {
          heading: "Expiration",
          text: "The expiration time for each cookie depends on its purpose and is set either by us or by the third-party provider."
        }
      ]
    }
  ];

  const cookieTypes = [
    {
      name: "Strictly Necessary",
      description: "Required for the website to function properly",
      example: "User authentication, security",
      duration: "Session or persistent",
      canBeDisabled: false
    },
    {
      name: "Performance",
      description: "Help us understand how visitors use our website",
      example: "Analytics, traffic sources",
      duration: "Persistent",
      canBeDisabled: true
    },
    {
      name: "Functionality",
      description: "Remember your preferences and choices",
      example: "Language settings, font size",
      duration: "Persistent",
      canBeDisabled: true
    },
    {
      name: "Advertising",
      description: "Deliver relevant advertisements",
      example: "Targeted ads, ad measurement",
      duration: "Persistent",
      canBeDisabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Cookie Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Learn about how we use cookies and how you can manage your preferences.
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
            <Badge className="mb-4">Cookie Summary</Badge>
            <h2 className="text-3xl font-bold mb-6">
              What You Need to Know
            </h2>
            <p className="text-gray-600 text-lg">
              This Cookie Policy explains how VentureMind uses cookies and similar tracking 
              technologies when you visit our website.
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
                      <span>Cookies help us provide a better user experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You can manage your cookie preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>We use different types of cookies for different purposes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Some cookies are essential for the website to function</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Your Choices</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Accept or reject non-essential cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Change your preferences at any time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Use browser settings to block cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Opt-out of third-party tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  By using our website, you consent to the use of cookies in accordance with this policy. 
                  You can manage your cookie preferences through our cookie settings panel.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Cookie Types Table */}
          <Card className="border-0 shadow-md mb-12">
            <CardHeader>
              <CardTitle className="text-xl">Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Cookie Type</th>
                      <th className="text-left py-3 px-4">Purpose</th>
                      <th className="text-left py-3 px-4">Example</th>
                      <th className="text-left py-3 px-4">Duration</th>
                      <th className="text-left py-3 px-4">Can be Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTypes.map((cookie, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{cookie.name}</td>
                        <td className="py-3 px-4">{cookie.description}</td>
                        <td className="py-3 px-4">{cookie.example}</td>
                        <td className="py-3 px-4">{cookie.duration}</td>
                        <td className="py-3 px-4">
                          {cookie.canBeDisabled ? (
                            <span className="text-green-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            Questions About Cookies?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            If you have any questions or concerns about our use of cookies, 
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
                Privacy Policy
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}