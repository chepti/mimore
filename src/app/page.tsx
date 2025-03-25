'use client'

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { LoginDialog } from "@/components/LoginDialog"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">ברוכים הבאים למימור</h1>
        <p className="text-xl text-gray-600 mb-8">הפלטפורמה לניהול וארגון חומרי הוראה על ציר זמן</p>
        <Button size="lg" onClick={() => setShowLogin(true)}>
          התחל עכשיו
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">למה מימור?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>ארגון פשוט</CardTitle>
              <CardDescription>ארגן את חומרי ההוראה שלך בצורה ויזואלית על ציר זמן</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>שיתוף קל</CardTitle>
              <CardDescription>שתף את החומרים שלך עם מורים אחרים בקלות</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>גישה נוחה</CardTitle>
              <CardDescription>גש לחומרים שלך מכל מקום, בכל זמן</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">איך זה עובד?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="font-bold mb-2">הרשמה</h3>
            <p>הירשם למערכת עם חשבון Google או דוא&quot;ל</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="font-bold mb-2">יצירת ציר</h3>
            <p>צור ציר זמן חדש עבור כיתה או נושא</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="font-bold mb-2">הוספת חומרים</h3>
            <p>הוסף חומרי הוראה לציר הזמן</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">4️⃣</div>
            <h3 className="font-bold mb-2">שיתוף</h3>
            <p>שתף את הציר עם מורים אחרים</p>
          </div>
        </div>
      </section>

      <LoginDialog isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  )
} 