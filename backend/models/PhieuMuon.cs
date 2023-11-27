using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend;
[Table("PhieuMuon")]
public partial class PhieuMuon
{

    public int? Id { get; set; }

    public DateTime? Ngaymuon { get; set; }
    public DateTime? Ngaytra { get; set; }
    public int? Userid { get; set; }

    public int? isDone { get; set; }


    public virtual ICollection<SachMuon> SachMuons { get; set; } = new List<SachMuon>();

    public virtual TaiKhoan? User { get; set; }
}
