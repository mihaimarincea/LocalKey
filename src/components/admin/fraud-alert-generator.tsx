"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { generateFraudAlerts } from "@/ai/flows/generate-fraud-alerts"
import { Loader2, ShieldAlert, Sparkles } from "lucide-react"

export function FraudAlertGenerator() {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateAlert = async () => {
    setLoading(true)
    setAlert(null)
    setError(null)
    try {
      const result = await generateFraudAlerts({})
      setAlert(result.alert)
    } catch (err) {
      setError("Failed to generate fraud alert. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Fraud Detection Center
        </CardTitle>
        <CardDescription>
          Use GenAI to analyze usage patterns and detect potential fraud.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerateAlert} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Analyze & Generate Alert
        </Button>

        {alert && (
          <Alert>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Potential Fraud Detected!</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}

        {error && (
            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

         {!alert && !error && !loading && (
            <div className="text-center text-muted-foreground p-4">
                <p>Click the button to start fraud analysis.</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
