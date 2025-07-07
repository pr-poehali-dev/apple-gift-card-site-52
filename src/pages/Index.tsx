import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [cart, setCart] = useState<
    { id: number; amount: number; price: number }[]
  >([]);
  const [showCart, setShowCart] = useState(false);

  const giftCards = [
    { id: 1, amount: 500, price: 500, popular: false },
    { id: 2, amount: 1000, price: 1000, popular: true },
    { id: 3, amount: 3000, price: 3000, popular: false },
    { id: 4, amount: 5000, price: 5000, popular: false },
  ];

  const addToCart = (card: { id: number; amount: number; price: number }) => {
    const existingItem = cart.find((item) => item.id === card.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === card.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...card, quantity: 1 }]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={24} className="text-black" />
              <h1 className="text-xl font-semibold text-black">
                Apple Gift Cards
              </h1>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon name="ShoppingCart" size={24} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-black mb-6">
            Подарочные карты Apple
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Идеальный подарок для любого случая. Мгновенная доставка на email.
          </p>
          <div className="flex justify-center mb-12">
            <img
              src="/img/9ff14e55-3348-49b0-9c88-efaf1306847f.jpg"
              alt="Apple Gift Card"
              className="w-80 h-48 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Gift Cards Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-black text-center mb-12">
            Выберите номинал
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCards.map((card) => (
              <Card
                key={card.id}
                className="relative p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                {card.popular && (
                  <Badge className="absolute -top-2 left-4 bg-blue-500 text-white">
                    Популярный
                  </Badge>
                )}
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">
                    {card.amount.toLocaleString()} ₽
                  </div>
                  <div className="text-gray-600 mb-6">
                    Подарочная карта Apple
                  </div>
                  <Button
                    onClick={() => addToCart(card)}
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-3 font-medium transition-colors"
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-black text-center mb-12">
            Почему выбирают нас
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Icon name="Zap" size={24} className="text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">
                Мгновенная доставка
              </h4>
              <p className="text-gray-600">
                Получите код подарочной карты на email за считанные минуты
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Icon name="Shield" size={24} className="text-green-500" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">
                100% безопасность
              </h4>
              <p className="text-gray-600">
                Все транзакции защищены современными протоколами шифрования
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Icon name="Headphones" size={24} className="text-purple-500" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">
                Поддержка 24/7
              </h4>
              <p className="text-gray-600">
                Наша команда всегда готова помочь вам с любыми вопросами
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCart(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">Корзина</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Корзина пуста</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold text-black">
                          {item.amount} ₽
                        </div>
                        <div className="text-sm text-gray-600">
                          Количество: {item.quantity || 1}
                        </div>
                      </div>
                      <div className="font-bold text-black">
                        {(item.price * (item.quantity || 1)).toLocaleString()} ₽
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-bold text-black mb-6">
                      <span>Итого:</span>
                      <span>{getTotalPrice().toLocaleString()} ₽</span>
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-3 font-medium">
                      Перейти к оплате
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
