
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const services = [
  {
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern JavaScript frameworks and backend technologies.",
    features: [
      "Responsive web applications",
      "RESTful API development",
      "Database design & optimization",
      "Authentication & authorization",
      "Performance optimization"
    ],
    basePrice: 2500,
    icon: "💻"
  },
  {
    title: "SaaS Architecture",
    description: "Design and implementation of scalable SaaS applications with focus on reliability and performance.",
    features: [
      "Microservices architecture",
      "Subscription management",
      "Multi-tenancy implementation",
      "Third-party integrations",
      "Deployment strategies"
    ],
    basePrice: 3500,
    icon: "🏗️"
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile app development with React Native for iOS and Android.",
    features: [
      "Cross-platform compatibility",
      "Native feature access",
      "Offline functionality",
      "Push notifications",
      "App store deployment"
    ],
    basePrice: 3000,
    icon: "📱"
  },
  {
    title: "DevOps / CI-CD",
    description: "Setting up automated workflows for testing, building and deploying applications.",
    features: [
      "CI/CD pipeline setup",
      "Infrastructure as code",
      "Container orchestration",
      "Monitoring & logging",
      "Security best practices"
    ],
    basePrice: 2000,
    icon: "🚀"
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [complexity, setComplexity] = useState(1);
  const [timeframe, setTimeframe] = useState(1);
  
  const complexityMultiplier = [1, 1.5, 2];
  const timeframeMultiplier = [1.5, 1, 0.8];
  
  const calculatePrice = () => {
    const service = services[activeService];
    const price = service.basePrice * complexityMultiplier[complexity] * timeframeMultiplier[timeframe];
    return Math.round(price);
  };
  
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services Offered</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional development services tailored to your project needs, 
            with transparent pricing and clear deliverables.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Pricing Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Pricing Calculator</CardTitle>
              <CardDescription className="text-center">
                Get an estimate for your project based on your specific requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type</label>
                    <Tabs defaultValue="0" onValueChange={(v) => setActiveService(parseInt(v))}>
                      <TabsList className="w-full grid grid-cols-2 mb-2">
                        <TabsTrigger value="0">Full-Stack</TabsTrigger>
                        <TabsTrigger value="1">SaaS Architecture</TabsTrigger>
                      </TabsList>
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="2">Mobile Dev</TabsTrigger>
                        <TabsTrigger value="3">DevOps/CI-CD</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Complexity</label>
                    <Tabs defaultValue="1" onValueChange={(v) => setComplexity(parseInt(v))}>
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="0">Simple</TabsTrigger>
                        <TabsTrigger value="1">Moderate</TabsTrigger>
                        <TabsTrigger value="2">Complex</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timeframe</label>
                    <Tabs defaultValue="1" onValueChange={(v) => setTimeframe(parseInt(v))}>
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="0">Rush</TabsTrigger>
                        <TabsTrigger value="1">Standard</TabsTrigger>
                        <TabsTrigger value="2">Flexible</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="rounded-lg bg-background p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {services[activeService].title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {services[activeService].description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {services[activeService].features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <span className="text-primary mr-2">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">Estimated Price:</span>
                        <span className="text-3xl font-bold">${calculatePrice()}</span>
                      </div>
                      <Button className="w-full">Schedule Consultation</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
