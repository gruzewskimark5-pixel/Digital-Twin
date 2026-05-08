# engines/solana_bridge.py
class AnchorBridge:
    def trigger_badge_transition(self, player_id: str, badge: str):
        print(f"Triggering badge transition on solana for {player_id} to {badge}")
