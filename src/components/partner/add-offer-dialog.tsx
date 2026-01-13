'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';
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
  expiresAt: z.date({
    required_error: 'Data de expirare este obligatorie.',
  }),
  image: z.instanceof(File).optional(),
});

type OfferFormValues = z.infer<typeof offerSchema>;

export function AddOfferDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const partnerDocRef = useMemoFirebase(() => user ? doc(firestore, `partners/${user.uid}`) : null, [user, firestore]);
  const { data: partnerProfile } = useDoc<Partner>(partnerDocRef);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const onSubmit = async (data: OfferFormValues) => {
    if (!user || !partnerProfile) {
        toast({ variant: 'destructive', title: 'Eroare', description: 'Trebuie să fii autentificat ca partener.' });
        return;
    }
    if (!data.image) {
        toast({ variant: 'destructive', title: 'Eroare', description: 'Te rugăm să încarci o imagine pentru ofertă.' });
        return;
    }

    setLoading(true);
    try {
        // 1. Upload image to Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, `offer_images/${user.uid}/${Date.now()}_${data.image.name}`);
        const uploadResult = await uploadBytes(imageRef, data.image);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        // 2. Add offer to Firestore with the image URL
        const offersCollection = collection(firestore, 'offers');
        await addDoc(offersCollection, {
            title: data.title,
            description: data.description,
            category: data.category,
            expiresAt: data.expiresAt,
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
                <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        onChange(e.target.files[0]);
                                    }
                                }}
                                {...rest}
                            />
                            <Label 
                                htmlFor="image"
                                className={cn(
                                    "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary",
                                    errors.image && "border-destructive"
                                )}
                            >
                                {preview ? (
                                     <Image src={preview} alt="Previzualizare imagine" width={100} height={100} className="h-full w-auto object-contain rounded-md" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                                        <UploadCloud className="w-8 h-8 mb-2" />
                                        <p className="mb-2 text-sm">Apasă pentru a încărca</p>
                                        <p className="text-xs">Imagine sau Video</p>
                                    </div>
                                )}
                            </Label>
                        </>
                    )}
                />
                 {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
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
                            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
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
                                    onSelect={(date) => {
                                        field.onChange(date);
                                        setDatePickerOpen(false);
                                    }}
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
