'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
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
import { Loader2, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Partner } from '@/types';

const offerSchema = z.object({
  title: z.string().min(5, 'Titlul trebuie să aibă cel puțin 5 caractere'),
  description: z.string().min(10, 'Descrierea trebuie să aibă cel puțin 10 caractere'),
  category: z.string().min(3, 'Categoria este obligatorie'),
  expiresAt: z.string().min(1, 'Data de expirare este obligatorie.'), // Changed to string for input type="date"
  image: z.any().refine(files => files?.length > 0, 'Imaginea este obligatorie.'),
});

type OfferFormValues = z.infer<typeof offerSchema>;

export function AddOfferDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);

  const partnerDocRef = useMemoFirebase(() => user ? doc(firestore, `partners/${user.uid}`) : null, [user, firestore]);
  const { data: partnerProfile } = useDoc<Partner>(partnerDocRef);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const onSubmit = async (data: OfferFormValues) => {
    if (!user || !partnerProfile) {
        toast({ variant: 'destructive', title: 'Eroare', description: 'Trebuie să fii autentificat ca partener.' });
        return;
    }
    
    const imageToUpload = data.image[0];

    if (!imageToUpload) {
        toast({ variant: 'destructive', title: 'Eroare', description: 'Te rugăm să încarci o imagine pentru ofertă.' });
        return;
    }

    setLoading(true);
    try {
        // 1. Upload image to Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, `offer_images/${user.uid}/${Date.now()}_${imageToUpload.name}`);
        const uploadResult = await uploadBytes(imageRef, imageToUpload);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        // 2. Add offer to Firestore with the image URL
        const offersCollection = collection(firestore, 'offers');
        await addDoc(offersCollection, {
            title: data.title,
            description: data.description,
            category: data.category,
            expiresAt: new Date(data.expiresAt), // Convert string back to Date for Firestore
            imageUrl: imageUrl, // Use the uploaded image URL
            partnerId: user.uid,
            partnerName: partnerProfile.companyName || 'Partener Necunoscut',
            partnerLogoUrl: 'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y29mZmVlJTIwYmVhbnxlbnwwfHx8fDE3NjgyNTE0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080', // Placeholder for logo
            isPaused: false,
            createdAt: serverTimestamp(),
            location: { lat: 34.0522, lng: -118.2437 }, // Mocked location
        });

        toast({
            title: 'Oferta a fost adăugată!',
            description: 'Noua ta ofertă este acum vizibilă pentru utilizatori.',
        });
        reset();
        setPreview(null);
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
    <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
            reset();
            setPreview(null);
        }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
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
                <Label>Imagine Ofertă</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="file:border-0 file:bg-transparent file:text-sm file:font-medium"
                    {...register('image')}
                />
                 {errors.image && <p className="text-xs text-destructive">{(errors.image as any).message}</p>}
                 {preview && (
                     <div className="mt-2">
                        <Image src={preview} alt="Previzualizare imagine" width={100} height={100} className="h-auto w-1/2 object-contain rounded-md" />
                     </div>
                 )}
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
                    <Input id="expiresAt" type="date" {...register('expiresAt')} />
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
