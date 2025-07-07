import { useState } from "react";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Star } from "lucide-react";

interface GiftCard {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  discount?: number;
}

interface CartItem extends GiftCard {
  quantity: number;
}

const giftCards: GiftCard[] = [
  {
    id: "1",
    name: "App Store & iTunes",
    price: 1000,
    originalPrice: 1200,
    image: "/img/app-store-card.jpg",
    rating: 4.8,
    reviews: 1234,
    category: "Развлечения",
    description: "Покупайте приложения, игры, музыку и многое другое",
    discount: 17,
  },
  {
    id: "2",
    name: "Apple Music",
    price: 500,
    image: "/img/apple-music-card.jpg",
    rating: 4.9,
    reviews: 892,
    category: "Музыка",
    description: "Слушайте миллионы песен без рекламы",
  },
  {
    id: "3",
    name: "iCloud Storage",
    price: 300,
    originalPrice: 400,
    image: "/img/icloud-card.jpg",
    rating: 4.7,
    reviews: 567,
    category: "Хранилище",
    description: "Дополнительное место для ваших данных",
    discount: 25,
  },
  {
    id: "4",
    name: "Apple Arcade",
    price: 750,
    image: "/img/apple-arcade-card.jpg",
    rating: 4.6,
    reviews: 456,
    category: "Игры",
    description: "Премиальные игры без рекламы и встроенных покупок",
  },
  {
    id: "5",
    name: "Apple TV+",
    price: 450,
    originalPrice: 600,
    image: "/img/apple-tv-card.jpg",
    rating: 4.8,
    reviews: 789,
    category: "Видео",
    description: "Эксклюзивные фильмы и сериалы Apple",
    discount: 25,
  },
  {
    id: "6",
    name: "Apple One",
    price: 2000,
    originalPrice: 2500,
    image: "/img/apple-one-card.jpg",
    rating: 4.9,
    reviews: 1123,
    category: "Подписка",
    description: "Все сервисы Apple в одном пакете",
    discount: 20,
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (giftCard: GiftCard) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === giftCard.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === giftCard.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...giftCard, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <GradientText>Apple Store</GradientText>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div
          className="text-center mb-12 py-20 rounded-3xl bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/img/f5a9700d-f9c3-4da7-ab29-5272ac8e300f.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 text-white leading-tight">
              Подарочные карты <GradientText>Apple</GradientText>
            </h2>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto">
              Выберите идеальный подарок для любого случая. Подарочные карты
              Apple дают доступ к лучшим приложениям, играм, музыке и сервисам.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {giftCards.map((card) => (
                <Card
                  key={card.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    {card.discount && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        -{card.discount}%
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{card.name}</CardTitle>
                        <CardDescription>{card.category}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {card.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({card.reviews})
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {card.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">
                          ₽{card.price}
                        </span>
                        {card.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ₽{card.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button onClick={() => addToCart(card)} size="sm">
                        <Plus className="h-4 w-4 mr-1" />В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {isCartOpen && (
            <div className="w-full lg:w-96">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Корзина</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCartOpen(false)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Корзина пуста
                    </p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                ₽{item.price}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold">
                            ₽{getTotalPrice()}
                          </span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
