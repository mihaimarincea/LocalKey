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
import { useLanguage } from "@/contexts/language-context"

export function FraudAlertGenerator() {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage();

  const handleGenerateAlert = async () => {
    setLoading(true)
    setAlert(null)
    setError(null)
    try {
      const result = await generateFraudAlerts({})
      setAlert(result.alert)
    } catch (err) {
      setError(t('adminLayout.fraud.errorDescription'))
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
          {t('adminLayout.fraud.title')}
        </CardTitle>
        <CardDescription>
          {t('adminLayout.fraud.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerateAlert} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {t('adminLayout.fraud.button')}
        </Button>

        {alert && (
          <Alert>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>{t('adminLayout.fraud.alertTitle')}</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}

        {error && (
            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>{t('adminLayout.fraud.errorTitle')}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

         {!alert && !error && !loading && (
            <div className="text-center text-muted-foreground p-4">
                <p>{t('adminLayout.fraud.prompt')}</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
