'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import type { Partner } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const offerSchema = z.object({
  title: z.string().min(5, 'Titlul trebuie să aibă cel puțin 5 caractere'),
  description: z.string().min(10, 'Descrierea trebuie să aibă cel puțin 10 caractere'),
  category: z.string().min(3, 'Categoria este obligatorie'),
  expiresAt: z.date({
    required_error: 'Data de expirare este obligatorie.',
  }),
});

type OfferFormValues = z.infer<typeof offerSchema>;

export function AddOfferDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const partnerDocRef = useMemoFirebase(() => user ? doc(firestore, `partners/${user.uid}`) : null, [user, firestore]);
  const { data: partnerProfile } = useDoc<Partner>(partnerDocRef);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
  });

  const onSubmit = async (data: OfferFormValues) => {
    if (!user || !partnerProfile) {
        toast({ variant: 'destructive', title: 'Eroare', description: 'Trebuie să fii autentificat ca partener.' });
        return;
    }
    setLoading(true);
    try {
        const offersCollection = collection(firestore, 'offers');
        await addDoc(offersCollection, {
            ...data,
            partnerId: user.uid,
            partnerName: partnerProfile.companyName || partnerProfile.name || 'Partener Necunoscut',
            partnerLogoUrl: PlaceHolderImages.find(p => p.id === 'partner-logo-1')?.imageUrl, // Placeholder
            imageUrl: PlaceHolderImages.find(p => p.id === 'offer-1')?.imageUrl, // Placeholder
            isPaused: false,
            createdAt: serverTimestamp(),
            // Mocked location data for now
            location: { lat: 34.0522, lng: -118.2437 },
        });

        toast({
            title: 'Oferta a fost adăugată!',
            description: 'Noua ta ofertă este acum vizibilă pentru utilizatori.',
        });
        reset();
        setOpen(false);
    } catch (error: any) {
        console.error("Error adding offer: ", error);
        toast({
            variant: "destructive",
            title: 'Eroare la adăugarea ofertei',
            description: error.message || 'A apărut o problemă. Încearcă din nou.',
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Adaugă o ofertă nouă</DialogTitle>
          <DialogDescription>
            Completează detaliile ofertei tale. Odată adăugată, va fi vizibilă pentru toți utilizatorii.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Titlu ofertă</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea id="description" {...register('description')} />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="category">Categorie</Label>
                    <Input id="category" {...register('category')} placeholder="ex. Cafenea, Restaurant" />
                    {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="expiresAt">Data expirării</Label>
                     <Controller
                        control={control}
                        name="expiresAt"
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : <span>Alege o dată</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.expiresAt && <p className="text-xs text-destructive">{errors.expiresAt.message}</p>}
                </div>
            </div>
        
            <DialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Anulează</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Adaugă oferta
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
