export async function stringIsAValidUrl (s: string): Promise<boolean>
{
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
}