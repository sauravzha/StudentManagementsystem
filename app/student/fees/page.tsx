"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function StudentFeesPage() {
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState(false);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPaid(true);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Fee Status</h1>

            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center border-b bg-gray-50">
                    <CardTitle className="text-2xl">Academic Year 2024-25</CardTitle>
                    <p className="text-gray-500">Standard 10 - Fee Breakdown</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span>Tuition Fee</span>
                        <span>$3,000</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span>Lab Fee</span>
                        <span>$1,000</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span>Library Fee</span>
                        <span>$500</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span>Transport Fee</span>
                        <span>$2,500</span>
                    </div>
                    <div className="flex justify-between pt-2 text-xl font-bold">
                        <span>Total Due</span>
                        <span>$7,000</span>
                    </div>

                    <div className="pt-6">
                        {paid ? (
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center gap-2 text-green-600 text-xl font-bold">
                                    <CheckCircle className="h-8 w-8" /> Payment Successful
                                </div>
                                <Button variant="outline" className="gap-2">
                                    <Download className="h-4 w-4" /> Download Receipt
                                </Button>
                            </div>
                        ) : (
                            <Button className="w-full h-12 text-lg gap-2" onClick={handlePay} disabled={loading}>
                                <CreditCard className="h-5 w-5" /> {loading ? "Processing..." : "Pay Now ($7,000)"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="max-w-2xl mx-auto">
                <h3 className="font-semibold mb-2">Payment History</h3>
                <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-medium">Term 1 Fee Payment</p>
                            <p className="text-xs text-gray-500">Paid on Jan 15, 2024</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" /> Receipt
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
