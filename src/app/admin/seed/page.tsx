
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore } from '@/firebase';
import { seedDatabase } from '@/lib/seed';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function SeedPage() {
    const firestore = useFirestore();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);
    const { toast } = useToast();

    const handleSeed = async () => {
        setLoading(true);
        setResult(null);

        const seedResult = await seedDatabase(firestore);
        
        setResult(seedResult);
        setLoading(false);

        toast({
            title: seedResult.success ? 'Success!' : 'Error!',
            description: seedResult.message,
            variant: seedResult.success ? 'default' : 'destructive',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Seed Database</CardTitle>
                <CardDescription>
                    Populate your Firestore database with initial mock data. This will create users, partners, and offers.
                    This action is idempotent and will overwrite existing mock data with the same IDs.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
                <Button onClick={handleSeed} disabled={loading} size="lg">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Seeding...
                        </>
                    ) : (
                        'Seed Database'
                    )}
                </Button>

                {result && (
                    <div className="mt-4 flex items-center gap-2">
                        {result.success ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <p className={result.success ? 'text-green-700' : 'text-destructive'}>
                            {result.message}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
