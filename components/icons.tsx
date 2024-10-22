import { cn } from "@/lib/utils";
import { ArrowLeft, ChartPieIcon, Loader2, SettingsIcon, ShieldCheckIcon, UserIcon, ArrowRight, Plus, Search, ChevronsUpDown, Martini, ChevronRight, Grid2x2Check, FlaskRound, Tags, Save, Trash, Pen, Check, X } from "lucide-react";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export type ValidIcon = keyof typeof Icons;

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  mono?: boolean;
}

export const Icons = {
    Logo: ({
        className,
        mono = false,
        ...props
    }: LogoProps) => (
        <Image src={mono ? "/logo_mono.png" : "/logo.png"} alt="Logo" width={512} height={512} {...props} className={cn("w-40 h-auto", className)} />
    ),
    ArrowLeft,
    Loading: ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
        <Loader2 className={cn("animate-spin w-4 h-4 mr-2", className)} />   
    ),
    Profile: UserIcon,
    Safe: ShieldCheckIcon,
    Stats: ChartPieIcon,
    Settings: SettingsIcon,
    ArrowRight: ArrowRight,
    Plus,
    Search,
    HeartEmpty: IoIosHeartEmpty,
    Heart: IoIosHeart,
    ChevronsUpDown,
    Drink: Martini,
    Right: ChevronRight,
    GridCheck: Grid2x2Check,
    FlaskRound,
    Tags,
    Save,
    Trash,
    Edit: Pen,
    Check,
    X
}