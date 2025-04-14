using System.Windows.Media;

public class Keszlet
{
    public int Id { get; set; }
    public string Nev { get; set; }
    public string Gyarto { get; set; }
    public string Lejarat { get; set; }
    public int Ar { get; set; }
    public int Mennyiseg { get; set; }
    public string Parcella { get; set; }
    // A Szin tulajdonságot nem tesszük közzé a UI számára
    public Brush Szin { get; set; }

    // Konstruktor
    public Keszlet(int id, string nev, string gyarto, string lejarat, int ar, int mennyiseg, string parcella, Brush szin)
    {
        Id = id;
        Nev = nev;
        Gyarto = gyarto;
        Lejarat = lejarat;
        Ar = ar;
        Mennyiseg = mennyiseg;
        Parcella = parcella;
        Szin = szin;
    }
}
