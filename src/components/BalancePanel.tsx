import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateUserBalance } from '../store/slices/appSlice';

const BalancePanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.app.currentUser);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [showTopUp, setShowTopUp] = useState(false);

    const handleTopUp = () => {
        const amount = parseInt(topUpAmount);
        if (amount > 0 && currentUser) {
            const newBalance = currentUser.balance + amount;
            dispatch(updateUserBalance(newBalance));
            setTopUpAmount('');
            setShowTopUp(false);
        }
    };

    if (!currentUser) return null;

    return (
        <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1rem', 
            borderRadius: '8px', 
            margin: '1rem 0',
            color: 'white'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Balance: {currentUser.balance}₴</span>
                <button 
                    className="btn-secondary" 
                    onClick={() => setShowTopUp(!showTopUp)}
                    style={{ padding: '0.5rem 1rem' }}
                >
                    Add funds
                </button>
            </div>
            
            {showTopUp && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                        <input
                            type="number"
                            placeholder="Amount"
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <button className="btn-primary" onClick={handleTopUp}>
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BalancePanel;
