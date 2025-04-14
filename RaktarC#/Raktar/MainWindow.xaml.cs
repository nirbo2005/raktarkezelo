using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using MySql.Data.MySqlClient;

namespace Raktar
{
    public partial class MainWindow : Window
    {
        // Változók deklarálása/
        List<Keszlet> adatok = new List<Keszlet>();
        private List<Keszlet> rendezettAdatok = new List<Keszlet>();
        private int lastSelectedIndex = -1;
        private string kapcsolatistring = "server=localhost;database=raktar;uid=root;password='';";

		public MainWindow()
		{
			try
			{
				InitializeComponent();
				Betoltes(); // Attempt to load data
			}
			catch (Exception ex)
			{
				MessageBox.Show($"Error during MainWindow initialization: {ex.Message}");
				Application.Current.Shutdown(); // Close the application gracefully
			}
		}

		private void LoginButton_Click(object sender, RoutedEventArgs e)
		{
			string username = tbox_felh.Text;
			string password = pwbox_jelszo.Password;

			// Simulate login validation logic
			if (ValidateLogin(username, password))
			{
				// Switch to AppControl upon successful login
				LoginControl.Visibility = Visibility.Collapsed;
				AppControl.Visibility = Visibility.Visible;

				MessageBox.Show("Sikeres bejelentkezés!");
			}
			else
			{
				MessageBox.Show("Invalid username or password!");
			}
		}

		private bool ValidateLogin(string username, string password)
		{
			// Replace this with actual validation logic
			return username == "user" && password == "admin"; // Example credentials
		}


		private void SwitchToApp_Click(object sender, RoutedEventArgs e)
		{
			// Switch to View 2
			LoginControl.Visibility = Visibility.Collapsed;
			AppControl.Visibility = Visibility.Visible;
		}

		private void SwitchToLogin_Click(object sender, RoutedEventArgs e)
		{
			// Switch to View 1
			AppControl.Visibility = Visibility.Collapsed;
			LoginControl.Visibility = Visibility.Visible;
		}

		// Listázás
		private async void Betoltes()
        {
            try
            {
                using (var conn = new MySqlConnection(kapcsolatistring))
                using (var cmd = new MySqlCommand("SELECT id, nev, gyarto, lejarat, ar, mennyiseg, parcella FROM keszlet;", conn))
                {
                    await conn.OpenAsync();
                    using (var dr = await cmd.ExecuteReaderAsync())
                    {
                        adatok.Clear();
                        DateTime today = DateTime.Today;
                        DateTime twoWeeksLater = today.AddDays(14);
                        while (await dr.ReadAsync())
                        {
                            int id = dr.GetInt32(0);
                            if (adatok.Any(x => x.Id == id)) continue;
                            DateTime lejaratDateTime = dr.GetDateTime(3);
                            var termek = new Keszlet(
                                id,
                                dr.GetString(1),
                                dr.GetString(2),
                                lejaratDateTime.ToString("yyyy/MM/dd"),
                                dr.GetInt32(4),
                                dr.GetInt32(5),
                                dr.GetString(6),
                                Brushes.White);
                            if (lejaratDateTime < today || termek.Mennyiseg < 10)
                                termek.Szin = Brushes.Red;
                            else if (lejaratDateTime <= twoWeeksLater || termek.Mennyiseg < 100)
                                termek.Szin = Brushes.Yellow;
                            adatok.Add(termek);
                        }
                        if (lastSelectedIndex == -1)
                        {
                            rendezettAdatok = adatok.OrderBy(x => x.Id).ToList();
                        }
                        else if (lastSelectedIndex == 0)
                        {
                            rendezettAdatok = adatok.OrderBy(x => x.Nev).ToList();
                        }
                        else if (lastSelectedIndex == 1)
                        {
                            rendezettAdatok = adatok.OrderBy(x => x.Lejarat).ToList();
                        }
                        else if (lastSelectedIndex == 2)
                        {
                            rendezettAdatok = adatok.OrderBy(x => x.Mennyiseg).ToList();
                        }
                        dtgEgy.ItemsSource = rendezettAdatok;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatok betöltése közben: " + ex.Message);
            }
        }

        // Problémás termékek kiemelése
        private void dtgEgy_LoadingRow(object sender, DataGridRowEventArgs e)
        {
            if (e.Row.Item is Keszlet termek)
            {
                e.Row.Background = termek.Szin;
            }
        }

        // Listázott adatok sorbarendezése
        private void lbox1_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            lastSelectedIndex = lbox1.SelectedIndex;
            if (lbox1.SelectedIndex == -1)
            {
                rendezettAdatok = adatok.OrderBy(x => x.Id).ToList();
            }
            else if (lbox1.SelectedIndex == 0)
            {
                rendezettAdatok = adatok.OrderBy(x => x.Nev).ToList();
            }
            else if (lbox1.SelectedIndex == 1)
            {
                rendezettAdatok = adatok.OrderBy(x => x.Lejarat).ToList();
            }
            else if (lbox1.SelectedIndex == 2)
            {
                rendezettAdatok = adatok.OrderBy(x => x.Mennyiseg).ToList();
            }
            dtgEgy.ItemsSource = rendezettAdatok;
        }

        // Sorba rendezés alapértelmezettre állítása (ID szerint)
        private void ResetButton_Click(object sender, RoutedEventArgs e)
        {
            lastSelectedIndex = -1;
            lbox1.SelectedIndex = -1;
            rendezettAdatok = adatok.OrderBy(x => x.Id).ToList();
            dtgEgy.ItemsSource = rendezettAdatok;
        }

        // 1. ablakra kattintáskor frissítés
        private void TabControl_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e.Source is TabControl tabControl && tabControl.SelectedIndex == 0)
            {
                Betoltes();
            }
        }        

        // Raktár áttekintés parcella választás
        private async void Btn_Sor_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button clickedButton)
            {
                string sorAzonosito = clickedButton.Content.ToString();
                await BetoltParcellaAdatok(sorAzonosito);
            }
        }

        // Parcella tartalmainak megjelenítése
        private async System.Threading.Tasks.Task BetoltParcellaAdatok(string parcellaAzonosito)
        {
            using (MySqlConnection conn = new MySqlConnection(kapcsolatistring))
            {
                await conn.OpenAsync();
                string query = "SELECT nev, gyarto, lejarat, mennyiseg, parcella FROM keszlet WHERE parcella LIKE @parcellaAzonosito";
                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@parcellaAzonosito", parcellaAzonosito + "-%");
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        List<string>[] oszlopAdatok = new List<string>[4];
                        for (int i = 0; i < 4; i++)
                        {
                            oszlopAdatok[i] = new List<string>();
                        }
                        while (await reader.ReadAsync())
                        {
                            string parcella = reader["parcella"].ToString();
                            char utolsoKarakter = parcella[parcella.Length - 1];
                            if (char.IsDigit(utolsoKarakter))
                            {
                                int raklapSzint = int.Parse(utolsoKarakter.ToString()) - 1;
                                if (raklapSzint >= 0 && raklapSzint < 4)
                                {
                                    oszlopAdatok[raklapSzint].Add($"{reader["nev"]} - {reader["mennyiseg"]} db");
                                }
                            }
                        }
                        lst_1.ItemsSource = oszlopAdatok[0];
                        lst_2.ItemsSource = oszlopAdatok[1];
                        lst_3.ItemsSource = oszlopAdatok[2];
                        lst_4.ItemsSource = oszlopAdatok[3];
                    }
                }
            }
        }

        // Új termék feltöltése
        private async void btn_fel_Click(object sender, RoutedEventArgs e)
        {
            string insertQuery = "INSERT INTO keszlet (nev, gyarto, lejarat, ar, mennyiseg, parcella) VALUES (@nev, @gyarto, @lejarat, @ar, @mennyiseg, @parcella)";
            try
            {
                using (MySqlConnection kapcsolat = new MySqlConnection(kapcsolatistring))
                {
                    await kapcsolat.OpenAsync();
                    using (MySqlCommand parancs = new MySqlCommand(insertQuery, kapcsolat))
                    {
                        parancs.Parameters.AddWithValue("@nev", tb_nev.Text);
                        parancs.Parameters.AddWithValue("@gyarto", tb_gyarto.Text);
                        parancs.Parameters.AddWithValue("@lejarat", dp_lejarat.SelectedDate);
                        parancs.Parameters.AddWithValue("@ar", tb_ar.Text);
                        parancs.Parameters.AddWithValue("@mennyiseg", tb_mennyiseg.Text);
                        parancs.Parameters.AddWithValue("@parcella", tb_parcella.Text);
                        int result = await parancs.ExecuteNonQueryAsync();
                        MessageBox.Show(result > 0 ? "Sikeres felvitel." : "Hiba történt a felvitel során.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }

        // Termék módosítása
        private async void btn_modositas_Click(object sender, RoutedEventArgs e)
        {
            string modositandoAdatok = "";
            List<string> szuroFeltetelek = new List<string>();
            string[] ids = tb_id_2.Text.Split(',');
            for (int i = 0; i < ids.Length; i++)
            {
                ids[i] = ids[i].Trim();
            }
            if (ids.Length > 0 && !string.IsNullOrWhiteSpace(ids[0]))
            {
                szuroFeltetelek.Add("id IN (" + string.Join(",", ids.Select(id => $"'{id}'")) + ")");
            }
            if (!string.IsNullOrWhiteSpace(tb_nev_2.Text))
                szuroFeltetelek.Add($"nev='{tb_nev_2.Text}'");
            if (!string.IsNullOrWhiteSpace(tb_gyarto_2.Text))
                szuroFeltetelek.Add($"gyarto='{tb_gyarto_2.Text}'");
            if (dp_lejarat_2.SelectedDate.HasValue)
                szuroFeltetelek.Add($"lejarat='{dp_lejarat_2.SelectedDate.Value.ToString("yyyy-MM-dd")}'");
            if (!string.IsNullOrWhiteSpace(tb_ar_2.Text))
                szuroFeltetelek.Add($"ar='{tb_ar_2.Text}'");
            if (!string.IsNullOrWhiteSpace(tb_mennyiseg_2.Text))
                szuroFeltetelek.Add($"mennyiseg='{tb_mennyiseg_2.Text}'");
            if (!string.IsNullOrWhiteSpace(tb_parcella_2.Text))
                szuroFeltetelek.Add($"parcella='{tb_parcella_2.Text}'");
            string szuroFeltetel = szuroFeltetelek.Count > 0 ? "WHERE " + string.Join(" AND ", szuroFeltetelek) : "";
            if (!string.IsNullOrWhiteSpace(tb_nev_1.Text))
                modositandoAdatok += $"nev='{tb_nev_1.Text}', ";
            if (!string.IsNullOrWhiteSpace(tb_gyarto_1.Text))
                modositandoAdatok += $"gyarto='{tb_gyarto_1.Text}', ";
            if (dp_lejarat_1.SelectedDate.HasValue)
                modositandoAdatok += $"lejarat='{dp_lejarat_1.SelectedDate.Value.ToString("yyyy-MM-dd")}', ";
            if (!string.IsNullOrWhiteSpace(tb_ar_1.Text))
                modositandoAdatok += $"ar='{tb_ar_1.Text}', ";
            if (!string.IsNullOrWhiteSpace(tb_mennyiseg_1.Text))
                modositandoAdatok += $"mennyiseg='{tb_mennyiseg_1.Text}', ";
            if (!string.IsNullOrWhiteSpace(tb_parcella_1.Text))
                modositandoAdatok += $"parcella='{tb_parcella_1.Text}', ";
            if (string.IsNullOrWhiteSpace(modositandoAdatok))
            {
                MessageBox.Show("Nincs módosítandó adat megadva.");
                return;
            }
            modositandoAdatok = modositandoAdatok.TrimEnd(',', ' ');
            string sqlUtasitas = $"UPDATE keszlet SET {modositandoAdatok} {szuroFeltetel}";
            try
            {
                using (MySqlConnection kapcsolat = new MySqlConnection(kapcsolatistring))
                {
                    await kapcsolat.OpenAsync();
                    using (MySqlCommand parancs = new MySqlCommand(sqlUtasitas, kapcsolat))
                    {
                        int eredmeny = await parancs.ExecuteNonQueryAsync();
                        MessageBox.Show(eredmeny > 0 ? "Sikeres módosítás." : "Nem történt módosítás.");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }


        // Termék törlése
        private async void btn_torles_Click(object sender, RoutedEventArgs e)
        {
            string szuroFeltetel = TorlesFilterKeszito();
            string selectQuery = "SELECT * FROM keszlet " + szuroFeltetel;
            using (MySqlConnection kapcsolat = new MySqlConnection(kapcsolatistring))
            {
                await kapcsolat.OpenAsync();
                MySqlCommand selectCommand = new MySqlCommand(selectQuery, kapcsolat);
                DbDataReader reader = await selectCommand.ExecuteReaderAsync();
                if (reader != null)
                {
                    List<string> torlendoTermekek = new List<string>();
                    while (await reader.ReadAsync())
                    {
                        torlendoTermekek.Add(reader["nev"].ToString());
                    }
                    reader.Close();
                    if (torlendoTermekek.Count > 0)
                    {
                        string termekLista = string.Join("\n", torlendoTermekek);
                        var confirmationWindow = MessageBox.Show(
                            $"A következő {torlendoTermekek.Count} termék törlésre kerül. Biztosan törli? Kattintson a 'Törlésre kijelölt termékek' gombra, hogy ellenőrizze őket.",
                            "Megerősítés", MessageBoxButton.YesNo);
                        if (confirmationWindow == MessageBoxResult.Yes)
                        {
                            string deleteQuery = "DELETE FROM keszlet " + szuroFeltetel;
                            MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, kapcsolat);
                            int deleteResult = await deleteCommand.ExecuteNonQueryAsync();
                            MessageBox.Show(deleteResult > 0 ? "Sikeres törlés." : "Nem történt törlés.");
                        }
                    }
                    else
                    {
                        MessageBox.Show("Nincs törlendő rekord.");
                    }
                }
                else
                {
                    MessageBox.Show("Hiba történt az olvasás során.");
                }
            }
        }

        // Törlésre kijelölt termékek megtekintése
        private void btn_megtekintes_Click(object sender, RoutedEventArgs e)
        {
            string szuroFeltetel = TorlesFilterKeszito();
            string selectQuery = "SELECT nev, mennyiseg, lejarat FROM keszlet " + szuroFeltetel;
            using (MySqlConnection kapcsolat = new MySqlConnection(kapcsolatistring))
            {
                kapcsolat.Open();
                MySqlCommand selectCommand = new MySqlCommand(selectQuery, kapcsolat);
                MySqlDataReader reader = selectCommand.ExecuteReader();
                List<string> torlendoTermekek = new List<string>();
                while (reader.Read())
                {
                    string nev = reader["nev"].ToString();
                    int mennyiseg = reader.GetInt32("mennyiseg");
                    DateTime lejarat = reader.GetDateTime("lejarat");
                    string termekLeiras = $"{nev} {mennyiseg}db ({lejarat.ToString("yyyy.MM.dd.")})";
                    torlendoTermekek.Add(termekLeiras);
                }
                reader.Close();
                if (torlendoTermekek.Count > 0)
                {
                    string termekLista = string.Join("\n", torlendoTermekek);
                    MessageBox.Show($"A következő termékek törlésre kerülnek:\n{termekLista}", "Törlendő termékek");
                }
                else
                {
                    MessageBox.Show("Nincs törlendő rekord.");
                }
            }
        }

        // Törléshez szükséges SQL filter összeállítása
        private string TorlesFilterKeszito()
        {
            List<string> szuroFeltetelek = new List<string>();
            string[] ids = tb_ids.Text.Split(',').Select(id => id.Trim()).Where(id => !string.IsNullOrWhiteSpace(id)).ToArray();
            if (ids.Length > 0)
            {
                szuroFeltetelek.Add("id IN (" + string.Join(",", ids.Select(id => $"'{id}'")) + ")");
            }
            if (!string.IsNullOrWhiteSpace(tb_nev_torles.Text)) szuroFeltetelek.Add($"nev='{tb_nev_torles.Text}'");
            if (!string.IsNullOrWhiteSpace(tb_gyarto_torles.Text)) szuroFeltetelek.Add($"gyarto='{tb_gyarto_torles.Text}'");
            if (!string.IsNullOrWhiteSpace(dp_lejarat_torles.Text))
            {
                DateTime lejaratDatum = DateTime.Parse(dp_lejarat_torles.Text);
                szuroFeltetelek.Add($"lejarat='{lejaratDatum.ToString("yyyy-MM-dd")}'");
            }
            if (!string.IsNullOrWhiteSpace(tb_ar_torles.Text)) szuroFeltetelek.Add($"ar='{tb_ar_torles.Text}'");
            if (!string.IsNullOrWhiteSpace(tb_mennyiseg_torles.Text)) szuroFeltetelek.Add($"mennyiseg='{tb_mennyiseg_torles.Text}'");
            if (!string.IsNullOrWhiteSpace(tb_parcella_torles.Text)) szuroFeltetelek.Add($"parcella='{tb_parcella_torles.Text}'");
            if (szuroFeltetelek.Count > 0)
            {
                return "WHERE " + string.Join(" AND ", szuroFeltetelek);
            }
            else
            {
                return "WHERE 1=1";
            }
        }
    }
}