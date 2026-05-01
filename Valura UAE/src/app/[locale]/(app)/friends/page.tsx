import { getFriendsSocialData } from "@/app/actions/social";
import FriendsScreen from "./_components/FriendsScreen";

/**
 * Friend graph — search by pseudonym only, pending inbox, weekly XP ordering.
 */
export default async function FriendsPage({ params: { locale } }: { params: { locale: string } }) {
  const initial = await getFriendsSocialData();
  return <FriendsScreen locale={locale} initial={initial} />;
}
